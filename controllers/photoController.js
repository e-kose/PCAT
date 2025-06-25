import fs from 'fs';

import Photo from '../models/Photo.js';

import { fileURLToPath } from 'url';

import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getPhoto(req, res) {
	try {
		const photo = await Photo.findById(req.params.id);
		res.render('photo', {
			photo,
		});
	} catch (err) {
		console.log(err);
	}
}

const getAllPhoto = async (req, res) => {
	try {
		const pageNumber = req.query.page || 1;
		const photosPerPage = 2;
		const totalPhotos = await Photo.find().countDocuments();
		console.log(req.query)
		const photos = await Photo.find({})
			.sort('-dateCreated')
			.skip((pageNumber - 1) * photosPerPage)
			.limit(photosPerPage);
		res.render('index', {
			photos,
			current: pageNumber,
			pages: Math.ceil(totalPhotos / photosPerPage),
		});
	} catch (err) {
		console.log(err);
		res.render('index', { photos: [] });
	}
};

const createPhoto = async (req, res) => {
	try {
		const uploadDir = 'public/uploads';

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		let uploadImage = req.files.image;
		let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
		uploadImage.mv(uploadPath, async () => {
			await Photo.create({
				...req.body,
				image: '/uploads/' + uploadImage.name,
			});
		});
		res.redirect('/');
	} catch {
		res.status(500).send('Bir hata oluştu');
	}
};

const updatePhoto = async (req, res) => {
	try {
		const photo = await Photo.findOne({ _id: req.params.id });
		photo.title = req.body.title;
		photo.description = req.body.description;
		photo.save();
		res.redirect(`/photos/${req.params.id}`);
	} catch (err) {
		console.log(err);
	}
};

const deletePhoto = async (req, res) => {
	try {
		const photo = await Photo.findOne({ _id: req.params.id });
		let deleteImage = __dirname + '/public/' + photo.image;
		if (fs.existsSync(deleteImage)) fs.unlinkSync(deleteImage);
		await Photo.findByIdAndDelete(req.params.id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

export { getPhoto, getAllPhoto, createPhoto, updatePhoto, deletePhoto };

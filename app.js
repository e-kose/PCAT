const express = require('express');

const methodOvirrede = require('method-override');

const path = require('path');

const ejs = require('ejs');

const fs = require('fs');

const Photo = require('./models/Photo');

const mongoose = require('mongoose');

const app = express();

const fileUpload = require('express-fileupload');

mongoose
	.connect('mongodb://localhost/pcat-db')
	.then(() => console.log('Veri tabanına bağlanıldı'))
	.catch(console.log('veri tabanına bağlanılamadı'));

//Template Engine
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOvirrede('_method'));

const port = 3000;
app.listen(port, () => {
	console.log(`Sunucu ${port}'unda çalıştı`);
});

app.get('/', async (req, res) => {
	try {
		const photos = await Photo.find({}).sort('-dateCreated');
		res.render('index', {
			photos,
		});
	} catch (err) {
		console.log(err);
		res.render('index', { photos: [] });
	}
});

app.get('/photos/:id', async (req, res) => {
	try {
		const photo = await Photo.findById(req.params.id);
		res.render('photo', {
			photo,
		});
	} catch (err) {
		console.log(err);
	}
});

app.get('/photos/edit/:id', async (req, res) => {
	try {
		const photo = await Photo.findOne({ _id: req.params.id });
		res.render('edit', {
			photo,
		});
	} catch (err) {
		console.log(err);
	}
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/add', (req, res) => {
	res.render('add');
});

app.post('/photos', async (req, res) => {
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
});

app.put('/photos/:id', async (req, res) => {
	try {
		const photo = await Photo.findOne({ _id: req.params.id });
		photo.title = req.body.title;
		photo.description = req.body.description;
		photo.save();
		res.redirect(`/photos/${req.params.id}`);
	} catch (err) {
		console.log(err);
	}
});

app.delete('/photos/:id', async (req, res) => {
	try {
		const photo = await Photo.findOne({ _id: req.params.id });
		let deleteImage = __dirname + '/public/' + photo.image;
		if (fs.existsSync(deleteImage))
			fs.unlinkSync(deleteImage);
		await Photo.findByIdAndDelete(req.params.id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
});

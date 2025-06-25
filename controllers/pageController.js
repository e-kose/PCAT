import Photo from "../models/Photo.js";

const getEditPage = async (req, res) => {
	try {
		const photo = await Photo.findOne({ _id: req.params.id });
		res.render('edit', {
			photo,
		});
	} catch (err) {
		console.log(err);
	}
};

const getAboutPage = (req, res) => {
	res.render('about');
};

const getAddpage = (req, res) => {
	res.render('add');
};
export{
	getEditPage,
	getAboutPage,
	getAddpage,
}
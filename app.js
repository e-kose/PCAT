const express = require('express');

const methodOvirrede = require('method-override');

const ejs = require('ejs');

const Photo = require('./models/Photo');

const app = express();

const fileUpload = require('express-fileupload');

const photoController = require("./controllers/photoController");

const pageController = require("./controllers/pageController");

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

app.get('/', photoController.getAllPhoto)

app.get('/photos/:id', photoController.getPhoto);

app.post('/photos', photoController.createPhoto)

app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/photos/edit/:id', pageController.getEditPage);

app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddpage);


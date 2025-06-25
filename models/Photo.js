const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
	.connect('mongodb://localhost/pcat-db')
	.then(() => console.log('Veri tabanına bağlanıldı'))
	.catch(console.log('veri tabanına bağlanılamadı'));

const photoSchema = new Schema({
	title: String,
	description: String,
	image: String,
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

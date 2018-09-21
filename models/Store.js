const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
	store: {
		type: String,
		trim: true, //Takes tailing and opening whitespaces out
		required: 'Please select an amt'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String]
});

storeSchema.pre('save', function(next) {
	if (!this.isModfied('name')) {
		next(); // Skip it
		return; // Stop this function from running
	}
	this.slug = slug(this.name);
	next();
	//TODO Make better, so slug are unique
});


module.exports = mongoose.model('Store', storeSchema); //This actually creates and names the Model 'Store'
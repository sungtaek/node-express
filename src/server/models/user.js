const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: String
}, { collection: 'users'});

userSchema.statics.findByName= function (name) {
	return this.find({'name': name});
}

module.exports = mongoose.model('user', userSchema);
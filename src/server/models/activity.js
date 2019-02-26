const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
	_id: String
}, { collection: 'activities'});

module.exports = mongoose.model('activity', activitySchema);
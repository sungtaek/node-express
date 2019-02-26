const uuid = require('uuid');
const Activity = require('../models/activity');

const addActivity = async(userId, type, action) => {
	const activity = new Activity();
	activity._id = uuid.v1();
	activity.userId = userId;
	activity.type = type;
	activity.action = action;
	activity.date = Date.now();

	try {
		return await activity.save()
			.then(result => {
				if(result > 0) {
					return activity._id;
				}
				return null;
			});
	} catch(err) {
		throw new Error("Database error: " + err.message);
	}
}

const getActivity = async(id) => {
	try {
		return await Activity.find({'_id': id})
			.then(activity => { return activity.toObject() });
	} catch (err) {
		throw new Error("Database error: " + err.message);
	}
}

const getUserActivities = async(userId, offset, limit) => {
	try {
		return await Activity.find({'userId': userId})
			.then(activities => { return activities.map(activity => { return activity.toObject() })});
	} catch (err) {
		throw new Error("Database error: " + err.message);
	}
}

module.exports = {
	addActivity,
	getActivity,
	getUserActivities,
}
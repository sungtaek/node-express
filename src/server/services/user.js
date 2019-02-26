const uuid = require('uuid');
const User = require('../models/user');

const addUser = async (name, age) => {
	const user = new User();
	user._id = uuid.v1();
	user.name = name;
	user.age = age;

	try {
		return await user.save()
			.then(result => {
				if(result > 0) {
					return user._id;
				}
				return null;
			});
	} catch(err) {
		throw new Error("Database error: " + err.message);
	}
}

const getUser = async (id) => {
	try {
		return await User.find({'_id': id})
			.then(user => { return user.toObject() });
	} catch(err) {
		throw new Error("Database error: " + err.message);
	}
}

const searchUser = async (name) => {
	try {
		return await User.findByName(name)
			.then(docs => { return docs.map(doc => { return doc.toObject() }) });
	} catch(err) {
		throw new Error("Database error: " + err.message);
	}
}


module.exports = {
	addUser,
	getUser,
	searchUser,
}
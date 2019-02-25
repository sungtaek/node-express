const express = require('express');
const router = express.Router();
const { header, param, query, body } = require('express-validator/check');
const { checkValidationResult } = require('../../middlewares/validator');
const {asyncControllerWrapper} = require('../utils/wrapper');

const userService = require('../services/user');
const activityService = require('../services/activity');

class Success {
	constructor() {
		this.resultCode = 0;
		this.resultMessage = "Success";
	}
}

const addUser = async (req, res, next) => {
	const name = req.body.name;
	const age = req.body.age;

	// add user
	const id = await userService.addUser(name, age);
	if(!id) {
		const err = new Error('Cannot add user');
		err.status(400);
		throw err;
	}

	const succ = new Success();
	succ.id = id;
	res.send(succ);
}

const getUser = async (req, res, next) => {
	const userId = req.param.id;

	// get user
	let user = await userService.getUser(userId);
	if(!user) {
		const err = new Error('Not found user');
		err.status(400);
		throw err;
	}

	const succ = new Success();
	succ.user = user;
	res.send(succ);
}

const getUserActivities = async (req, res, next) => {
	const userId = req.param.id;

	// get user
	let user = await userService.getUser(userId);
	if(!user) {
		const err = new Error('Not found user');
		err.status(400);
		throw err;
	}

	// get activities
	let activities = await activityService.getUserActivities(userId, 0, 100);

	const succ = new Success();
	succ.activities = activities;
	res.send(succ);
}

router.post('/',
	body(['name', 'age']).exists(),
	checkValidationResult,
	asyncControllerWrapper(addUser));

router.get('/:id',
	query('countryCode').exists(),
	checkValidationResult,
	asyncControllerWrapper(getUser));

router.get('/:id/activities',
	query('countryCode').exists(),
	checkValidationResult,
	asyncControllerWrapper(getUserActivities));

module.exports = router;

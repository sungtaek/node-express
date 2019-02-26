const { header } = require('express-validator/check');

const userController = require('./controllers/user');

const defaultCheck = [
	header('x-country').exists(),
	header('x-version').exists(),
];

module.exports = function(app, env) {

	// user
	app.use('/users', defaultCheck, userController);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		const err = new Error("Not found");
		err.status = 400;
		next(err);
	});

	// default error handler
	app.use(function(err, req, res, next) {
		console.error(err);
		res.status(err.status || 500);
		res.send({
			result: "Fail",
			message: err.message
		})
	});

};

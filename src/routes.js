const { header } = require('express-validator/check');

const cardController = require('./app/controllers/user');

const defaultCheck = [
	header('x-m1-devicemodelid').exists(),
];

module.exports = function(app, env) {

	// card
	app.use('/api/v3/cp', defaultCheck, cardController);

	// catch 404 and forward to error handler
	app.use('/api', function(req, res, next) {
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

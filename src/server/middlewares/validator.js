const {validationResult} = require('express-validator/check');

const checkValidationResult = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		const err = new Error("Invalid parameter " + JSON.stringify(errors.array()));
		err.status = 400;
		next(err);
	}
	next();
}

module.exports = {
	checkValidationResult
}

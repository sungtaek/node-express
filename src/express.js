const express = require('express');
const validator = require('express-validator');
const logger = require('morgan');

module.exports = function(app, env) {

	app.set('json replacer', function(k, v) {
		if(this[k] instanceof Date) {
			v = this[k].toISOString().substr(0,19).replace(/[-:T]/g, '');
		}
		return v;
	});

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(express.static('public'));
	app.use(validator());

};
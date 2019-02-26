const path = require('path');
const express = require('express');

const expressConfigure = require('./express');
const routesConfigure = require('./routes');
const databaseConfigure = require('./database');


const defaultEnv = {
	root: path.join(__dirname, '../..'),
	db: "mongodb://localhost:40217/M1_Commit?maxPoolSize=200"
};

module.exports = function(env) {

	const app = express();
	env = Object.assign(defaultEnv, env);

	expressConfigure(app, env);
	routesConfigure(app, env);
	databaseConfigure(env);

	return app;
};
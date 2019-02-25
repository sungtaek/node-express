const express = require('express');

const env = require('./env');
const expressConfigure = require('./express');
const routesConfigure = require('./routes');
const databaseConfigure = require('./database');

const app = express();

expressConfigure(app, env);
routesConfigure(app, env);
databaseConfigure(env);

app.listen(env.port);
console.log("Server started on port " + env.port);

module.exports = app;

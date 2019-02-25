const path = require('path');
const minimist = require('minimist');

module.exports = Object.assign({
	root: path.join(__dirname, '..'),
	host: "0.0.0.0",
	port: 80,
	db: "mongodb://localhost:40217/M1_Commit?maxPoolSize=200"
}, minimist(process.argv.slice(2)));

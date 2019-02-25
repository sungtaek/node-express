const mongoose = require('mongoose');

module.exports = function(env) {
	const opt = {
		server: {
			auto_reconnect: true,
			socketOptions: {keepAlive: 1}
		}
	};
	mongoose.connect(env.db, opt)
		.then(() => console.log("Connected mongod server"))
		.catch(e => console.error(e));
};
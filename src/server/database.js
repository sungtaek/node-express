const mongoose = require('mongoose');

function connect(url, opt) {
	return mongoose.connect(url, opt)
		.then(() => console.log("Connected mongod server!"))
		.catch(e => {
			console.error("Failed to connect to mongo on startup - retrying in 5 sec", e);
			setTimeout(connect, 5000, url, opt);
		});
}

module.exports = function(env) {
	const opt = {
		server: {
			auto_reconnect: true,
			socketOptions: {keepAlive: 1}
		}
	};
	connect(env.db, opt);
};
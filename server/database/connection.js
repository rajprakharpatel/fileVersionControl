const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

async function connectDB(uri, callback) {
	// mongodb connection string
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}, callback)
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

}

module.exports = connectDB;

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const env = require('../../config/env')

async function connectDB() {
	// mongodb connection string
	try {
		const res = await mongoose.connect(env.COSMOS_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connection to CosmosDB succesfull');
		return res
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

}

module.exports = connectDB;

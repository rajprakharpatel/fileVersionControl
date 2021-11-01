const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const dotenv = require('dotenv')

const result = dotenv.config({ path: 'config.env' })
if (result.error) {
	console.log(result.error);
}

async function connectDB() {
	// mongodb connection string
	try {
		const res = await mongoose.connect(process.env.COSMOS_DB_URI, {
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

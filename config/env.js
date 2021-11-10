var dotenv;

if (process.env.NODE_ENV === "development") {
	dotenv = require('dotenv')
	dotenv.config({path:'config.env'})
	console.log('In development environment');
}
else{
	console.log('In production environment');
}

const env = {
	PORT: process.env.PORT,
	COSMOS_DB_URI: process.env.COSMOS_DB_URI
}

module.exports = env

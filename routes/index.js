var express = require('express');
var router = express.Router();
var path = require('path')
const axios = require('axios').default;
const connectDB = require('../server/database/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
	// mongodb connection
	const connection = connectDB();
	if (connection) {
		console.log('Hello ');
	}
	res.sendFile(path.resolve('./public/html/dashboard.html'), { title: 'Express' });
});

module.exports = router;

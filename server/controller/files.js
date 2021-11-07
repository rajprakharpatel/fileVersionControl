const File = require('../model/files');

// create and save file
exports.upload = (req, res) => {
	const originalFile = {
		fileName: req.body.fileName,
		hashedValue: req.body.hashedValue,
		fileContent: req.body.fileContent,
		version: req.body.version,
		lastModified: req.body.lastModified,
	};
	const file = new File(originalFile);
	file.save().then(() => {
		res.status(201).json(file);
		console.log("file created successfully!");
	}).catch((error) => {
		checkServerError(res, error)
	});
}

// retrieve list of all files
exports.list = (req, res) => {
	const query = File.find({});
	query
		.exec()
		.then((files) => {
			res.status(200).json(files);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
}

// download a file
exports.download = (req, res) => {
	res.send("To implement download")
}

// delete a file
exports.delete = (req, res) => {
	res.send("To implement delete")
}

function checkServerError(res, error) {
	if (error) {
		res.status(500).send(error);
		return error;
	}
}

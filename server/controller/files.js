const File = require('../model/files');

// create and save file
exports.upload = (req, res) => {
	const originalFile = {
		fileName: req.body.fileName,
		hashedValue: req.body.hashedValue,
		fileContent: req.body.fileContent,
		version: req.body.version,
		lastModified: new Date(),
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
exports.list = (_req, res) => {
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
	const query = File.find({fileName: req.query.name, version: req.query.version})
	query
		.exec()
		.then((files) => {
			const fileData = JSON.stringify(files[0].fileContent);
			// console.log(fileData);
			res.set({"Content-Disposition":`attachment; filename=${files[0].fileName}`});
			res.status(200).send(fileData);
			// res.status(200).json(files);
		})
		.catch((error) => {
			res.status(500).send(error);
		});

// 	res.send("To implement download")
}

// delete a file
exports.delete = (_req, res) => {
	res.send("To implement delete")
}

function checkServerError(res, error) {
	if (error) {
		res.status(500).send(error);
		return error;
	}
}

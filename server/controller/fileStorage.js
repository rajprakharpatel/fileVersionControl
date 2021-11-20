const fs = require("fs");
const blobServiceClient = require("../storage/files");
// load env vars
const account = process.env.ACCOUNT_NAME || "";
const SAS = process.env.SAS || "";

const bsc = blobServiceClient(`https://${account}.blob.core.windows.net${SAS}`);

exports.list = async (req, res) => {
	const containers = [];
	try {
		for await (const container of bsc.listContainers()) {
			// console.log(`Container ${i++}: ${container.name}`);
			// console.log(container);
			containers.push(container.name);
		}
	} catch (err) {
		console.error("err:::", err);
	}
	res.json(containers);
};

exports.create = async (req, res) => {
	const containerName = `${req.body.containerName}${new Date().getTime()}`;
	let requestId = "";
	try {
		const containerClient = bsc.getContainerClient(containerName);
		const createContainerResponse = await containerClient.create();
		console.log(
			`Create container ${containerName} successfully`,
			createContainerResponse.requestId
		);
		requestId = createContainerResponse.requestId;
		res.json({ requestId, containerName });
	} catch (err) {
		console.error("err:::", err);
	}
};

exports.delete = async (req, res) => {
	const containerName = req.query.containerName;
	let requestId = "";
	try {
		const containerClient = bsc.getContainerClient(containerName);
		const createContainerResponse = await containerClient.deleteIfExists();
		requestId = createContainerResponse.requestId;
		if (requestId === null || requestId === "") {
			console.log(`container ${containerName} doesn't exist`);
		} else {
			console.log(
				`Delete container ${containerName} successfully`,
				createContainerResponse.requestId
			);
		}
	} catch (err) {
		console.error("err:::", err);
	}
	res.json({ requestId, containerName });
};

exports.folder = async (req, res) => {
	let result = [];
	try {
		const containerClient = bsc.getContainerClient(req.query.containerName);
		for await (const item of containerClient.listBlobsByHierarchy("/")) {
			if (item.kind === "prefix") {
				console.log(`\tBlobPrefix: ${item.name}`);
				result.push(item.name)
			} else {
				console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
			}
		}
		res.json(result);
	} catch (err) {
		console.log("err:::", err);
		res.status(500).send("error in finding that container")
	}
};

exports.listBlobs = async (req, res) => {
	let result = [];
	console.log(req.query.containerName);

	try {
		const containerClient = bsc.getContainerClient(req.query.containerName);
		let blobs = containerClient.listBlobsFlat();
		for await (const blob of blobs) {
			result.push(blob.name)
		}
	} catch (err) {
		console.error("err:::", err);
	}
	res.json(result);
};

exports.createBlob = async (req, res) => {
	let requestId = '';
	let name = '';
	try {
		const containerName = req.body.containerName;
		const containerClient = bsc.getContainerClient(containerName);
		const blobName = req.body.blob.originalFilename;
		const blockBlobClient = containerClient.getBlockBlobClient(blobName);
		const uploadBlobResponse = await blockBlobClient.uploadFile(req.body.blob.path);
		console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
		requestId = uploadBlobResponse.requestId;
		name = blobName;
	} catch (err) {
		console.error("err:::", err);
	}
	res.json({ requestId, blobName: name });
};

exports.downloadBlob = async (req, res) => {
	const containerName = req.query.containerName
	const blobName = req.query.blobName
	const containerClient = bsc.getContainerClient(containerName);
	const blobClient = containerClient.getBlobClient(blobName);

	// Get blob content from position 0 to the end
	// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
	const downloadedBuffer = await blobClient.downloadToBuffer();
	res.set({
		"Content-Disposition": `attachment; filename=${blobName}`,
	});
	res.set("Content-type", `application/pdf`);
	res.status(200).send(downloadedBuffer);
};

exports.deleteBlob = async (req, res) => {
	const containerName = req.query.containerName
  const blobName = req.query.blobName
  const containerClient = bsc.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  const response = await blobClient.deleteIfExists();
  console.log(response.requestId)
  res.json({requestId: response.requestId});
}

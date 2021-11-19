const File = require("../model/files");
const crypto = require("crypto");
const fs = require("fs");

// create and save file
exports.upload = (req, res) => {
  const fileBuffer = fs.readFileSync(req.body.file.path);
  const originalFile = {
    name: req.body.file.originalFilename,
    hash: hash(fileBuffer),
    file: { data: fileBuffer, contentType: req.body.file.type },
    version: 1,
    lastModified: new Date(),
  };
  checkDuplicate(originalFile)
    .then((result) => {
      // console.log("result: ", result);
      if (result) {
        res.status(409).send("Duplicate File");
      } else {
        const file = new File(originalFile);
        file
          .save()
          .then(() => {
            res.status(201).json(file);
            // console.log("file uploaded successfully!");
          })
          .catch((error) => {
            checkServerError(res, error);
          });
      }
    })
};

const hash = (fileBuffer) => {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);

  const hex = hashSum.digest("hex");
  return hex;
};

// check if file already exists
const checkDuplicate = (newFile) => {
  // console.log("checkDuplicate");
  const query = File.find({ name: newFile.name });
  return query
    .exec()
    .then((files) => {
      if (files.length == 0) {
        return false;
      }
      var lhash = "";
      var lversion = 0;
      files.forEach((file) => {
        if (lversion < file.version) {
					console.log(file.version);
          lversion = file.version;
          lhash = file.hash;
        }
      });
      if (lhash == newFile.hash) return true;
			newFile.version = lversion + 1;
      return false;
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

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
};

// download a file
exports.download = (req, res) => {
  const query = File.find({
    name: req.query.name,
    version: req.query.version,
  });
  query
    .exec()
    .then((files) => {
      res.set({
        "Content-Disposition": `attachment; filename=${files[0].name}`,
      });
      res.set("Content-type", `${files[0].file.contentType}`);
      res.status(200).send(files[0].file.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// delete a file
exports.delete = (req, res) => {
  File.findOneAndDelete({
    name: req.query.name,
    version: req.query.version,
  }).then((file) => {
    if (!checkFound(res, file)) return;
    res.status(200).json(file);
    console.log("File deleted succesfully");
  });
};

function checkFound(res, file) {
  if (!file) {
    res.status(404).send("File not found");
    return;
  }
  return file;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

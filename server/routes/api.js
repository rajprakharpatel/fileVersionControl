const express = require("express");
const router = express.Router();
const fileDb = require("../controller/files");
const fs = require("fs");

router.get("/list", fileDb.list);
router.post("/upload", fileDb.upload);
router.delete("/delete", fileDb.delete);
router.get("/download", fileDb.download);

// router.post("/files", (req, res) => {
//   // console.log("api/file POST: ", typeof req.files.file);
//   console.log("stream :", Object.keys(req.body.file));
//   console.log("file :", req.body.file);
//   // console.log("originalFilename :", req.body.file.originalFilename);
//   let con = fs.readFileSync(req.body.file.path);
//   console.log(con);

//   // res.send(req.files.file);
// });

module.exports = router;

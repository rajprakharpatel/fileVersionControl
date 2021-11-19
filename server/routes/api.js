const express = require("express");
const router = express.Router();
const fileDb = require("../controller/files");

router.get("/list", fileDb.list);
router.post("/upload", fileDb.upload);
router.delete("/delete", fileDb.delete);
router.get("/download", fileDb.download);

module.exports = router;

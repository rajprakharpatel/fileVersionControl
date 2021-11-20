const express = require("express");
const router = express.Router();
const fileDb = require("../controller/files");
const fileStrg = require("../controller/fileStorage");

router.get("/list", fileDb.list);
router.post("/upload", fileDb.upload);
router.delete("/delete", fileDb.delete);
router.get("/download", fileDb.download);

router.get('/test/list', fileStrg.list);
router.post('/test/create', fileStrg.create);
router.delete('/test/delete/', fileStrg.delete);
router.get('/test/folder', fileStrg.folder);
router.get('/test/listblobs', fileStrg.listBlobs);
router.post('/test/createblobs', fileStrg.createBlob);
router.get('/test/downloadblob', fileStrg.downloadBlob);
router.delete('/test/deleteblob', fileStrg.deleteBlob);

module.exports = router;

const express = require("express");
const router = express.Router();
const fileDb = require("../controller/files")


router.get("/list", fileDb.list);
router.post("/upload", fileDb.upload);
router.delete("/delete", fileDb.delete);
router.get("/download", fileDb.download);

router.get("/test", (req, res, _next) => {
    console.log("api/test: req", req);
    res.send(req);
});

router.post("/test", (req, res, _next) => {
    console.log("api/test:post", req);
    res.send(req);
});

module.exports = router;

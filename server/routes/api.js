const express = require("express");
const router = express.Router();
const fileDb = require("../controller/files")


router.get("/list", (req, res, _next) => {
    fileDb.list(req, res);
});

router.post("/jkdsajsldl", (req, res) => {
    fileDb.upload(req, res);
});

router.delete("/delete", (req, res) => {
    fileDb.delete(req, res);
});

router.get("/download", (req, res) => {
    fileDb.download(req, res);
});

router.get("/test", (req, res, _next) => {
    console.log("api/test: req", req);
    res.send(req);
});

router.post("/test", (req, res, _next) => {
    console.log("api/test:post", req);
    res.send(req);
});

module.exports = router;

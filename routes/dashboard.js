var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {

  res.sendFile(path.resolve(__dirname+"/../public/html/dashboard.html"), {
    title: "File Version Management",
  });
});

module.exports = router;

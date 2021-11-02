var express = require("express");
var router = express.Router();
var path = require("path");
const axios = require("axios").default;

/* GET home page. */
router.get("/", function (req, res, next) {

  res.sendFile(path.resolve(__dirname+"/../public/html/dashboard.html"), {
    title: "Express",
  });
});

module.exports = router;

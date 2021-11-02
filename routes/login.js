var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render('base', {title:"User Login"});
});

const credential = {
  email: "admin@gmail.com",
  password: "admin123",
};

//login user
router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    //res.redirect('/dashboard');
    res.end("Login Successful!");
  } else {
    res.end("Invalid Username");
  }
});

module.exports = router;

var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var dashboardRouter = require("./routes/dashboard");
var loginRouter = require("./routes/login");
const connectDB = require("./server/database/connection");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);
app.use(logger("tiny"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mongodb connection
connectDB()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Cant connect to Database");
  });

// load static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/dashboard", dashboardRouter);
app.use("/", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

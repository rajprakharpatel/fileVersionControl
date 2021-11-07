const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectdb = require("./server/database/connection")

const dashboardRouter = require("./server/routes/dashboard");
const loginRouter = require("./server/routes/login");
const apiRouter = require("./server/routes/api")
// const bodyParser = require("body-parser");
const {v4: uuidv4} = require("uuid");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: uuidv4(),
		resave: false,
		saveUninitialized: true,
	})
);

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// connect to cosmosbd database
connectdb();

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// serve routes
app.use("/dashboard", dashboardRouter);
app.use("/", loginRouter);
app.use("/api", apiRouter)
app.get("*", (_req, res) => {
	res.send("404")
})

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

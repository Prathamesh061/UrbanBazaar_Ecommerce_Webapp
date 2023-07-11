require("dotenv").config(); // Environmental variables initialization
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
require("./utils/database")(); // Database initialization
const { catchError } = require("./middlewares");
const ErrorHandler = require("./utils/errorHandler");
const app = express();

/**
 * view engine setup
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/**
 * Middlewares
 */

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Use Routers
 */

app.use("/", indexRouter);
app.use("/users", usersRouter);
require("./routes/product.route")(app);
require("./routes/user.route")(app);

/**
 *  Page not found
 */
app.use(function (req, res, next) {
  next(new ErrorHandler("Page not found...", 404));
});

/**
 * Error Handling
 */
app.use(catchError);

module.exports = app;

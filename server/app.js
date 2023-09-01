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
const cors = require("cors");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const app = express();
/**
 * view engine setup
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Middlewares
 */

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

/**
 * Use Routers
 */

app.use("/", indexRouter);
app.use("/users", usersRouter);
require("./routes/product.route")(app);
require("./routes/user.route")(app);
require("./routes/order.route")(app);
require("./routes/payment.route")(app);

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

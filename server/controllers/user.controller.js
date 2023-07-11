const { catchAsyncError } = require("../middlewares");
const ErrorHandler = require("../utils/errorHandler");
const UserModel = require("../models/user.model");
const sendJWTTokenCookie = require("../utils/setJWTTokenCookie");

// To Register a user
exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "12322234",
      url: "https//:www.example.com",
    },
  });

  sendJWTTokenCookie(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please, Enter user credentials", 400));
  }

  const user = await UserModel.findOne({
    email,
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid user credentials", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid user credentials", 401));
  }

  sendJWTTokenCookie(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res) => {
  res.clearCookie("token", { httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

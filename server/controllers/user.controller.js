const { catchAsyncError } = require("../middlewares");
const ErrorHandler = require("../utils/errorHandler");
const UserModel = require("../models/user.model");
const sendJWTTokenCookie = require("../utils/setJWTTokenCookie");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    next(new ErrorHandler("User not Found", 404));
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/eshop/api/v1/password/reset/${resetToken}`;

  try {
    await sendEmail({
      name: user.name,
      email: user.email,
      subject: "UrbanBazaar Password Recovery",
      resetPasswordURL,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(err.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password link is invalid or expired.", 401)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match.", 401));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendJWTTokenCookie(user, 200, res);
});

exports.getDetails = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

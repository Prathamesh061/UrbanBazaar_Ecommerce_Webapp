const { catchAsyncError } = require("../middlewares");
const ErrorHandler = require("../utils/errorHandler");
const OrderModel = require("../models/order.model");
const ProductModel = require("../models/product.model");

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getAllOrderDetails = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

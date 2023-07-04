const { catchAsyncError } = require("../middlewares");
const ProductModel = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.find();

  res.status(201).json({ success: true, products });
});

exports.getDetails = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found...", 500));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found...", 500));
  }

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found...", 500));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully...",
  });
});

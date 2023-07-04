const ProductModel = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find();

    res.status(201).json({ success: true, products });
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    next(err);
  }
};

exports.getDetails = async (req, res, next) => {
  try {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found...", 500));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
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
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found...", 500));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully...",
    });
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    next(err);
  }
};

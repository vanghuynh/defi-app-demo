var express = require('express');
var router = express.Router();

const { ProductModel } = require('../database/database');
const e = require('express');

/* Retrieve All Products */
const getAllProducts = async function (req, res, next) {
  try {
    const products = await ProductModel.find();
    return res.json({ success: true, data: products });
  } catch (error) {
    return res.json({ success: false, data: error });
  }
};

/* Create product. */
const createProduct = async function (req, res, next) {
  try {
    const { name, price, quantity, description } = req.body;
    const product = new ProductModel({ name, price, quantity, description });
    const result = await product.save();
    console.log(result);
    return res.json({
      'success': true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    return res.json({ success: false, data: error });
  }
};

/* Update product. */
const updateProduct = async (req, res, next) => {
  try {
    const { name, price, quantity, description } = req.body;
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .json({
          'success': false,
          'message': 'Product not found',
        })
        .status(404);
    }
    const result = await ProductModel.updateOne(
      { _id: id },
      { name, price, quantity, description }
    );
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { name, price, quantity, description },
    });
  } catch (error) {
    return res.json({ success: false, data: error });
  }
};

/* Delete product. */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .json({
          'success': false,
          'message': 'Product not found',
        })
        .status(404);
    }
    const result = await ProductModel.deleteOne({ _id: id });
    console.log(result);
    return res.json({
      'success': true,
      'message': 'Product deleted successfully',
    });
  } catch (error) {
    return res.json({ success: false, data: error });
  }
};

/* Get single product by id. */
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .json({
          'success': false,
          'message': 'Product not found',
        })
        .status(404);
    }
    res.json({ 'success': true, data: product });
  } catch (error) {
    return res.json({ success: false, data: error });
  }
};

exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProduct = getProduct;

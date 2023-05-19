import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import { prepareSuccessResponse } from "../utils.js";

export async function getAllProducts(req, res, next) {
  try {
    console.log("controller getAllProducts");
    const result = await ProductModel.find({});
    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function addProduct(req, res, next) {
  try {
    const productBody = { ...req.body };
    productBody._id = new mongoose.Types.ObjectId();
    //productBody.time = new Date().toISOString();
    console.log("controller addProduct: ", productBody);
    const newProduct = new ProductModel(productBody);
    const result = await newProduct.save();
    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { product_id } = req.params;
    const updatedProduct = { ...req.body };
    updatedProduct._id = new mongoose.Types.ObjectId(product_id);
    console.log("controller updatedProduct: ", updatedProduct);
    const result = await ProductModel.findOneAndUpdate(
      { _id: updatedProduct._id },
      { ...updatedProduct },
      { new: true }
    );

    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { product_id } = req.params;
    console.log("controller deleteProduct: ", product_id);
    const result = await ProductModel.deleteOne({
      _id: new mongoose.Types.ObjectId(product_id),
    });
    res.send(prepareSuccessResponse(result));
  } catch (error) {}
}

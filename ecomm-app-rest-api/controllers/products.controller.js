import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import { prepareSuccessResponse } from "../utils.js";

export async function getAllProducts(req, res, next) {
  try {
    console.log("controller getAllProducts");
    const result = await ProductModel.find({});
    // const result = await ProductModel.findOne({
    //   _id: "6466d772434af5bc980a0645",
    // });
    // console.log("getAllProducts: ", result);
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
    if (!productBody.pictures || productBody.pictures.length == 0)
      productBody.pictures = generatePictures();

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

export async function addProductReviewFeedback(req, res, next) {
  try {
    const { product_id } = req.params;
    const productObjId = new mongoose.Types.ObjectId(product_id);
    //
    const newFeedback = { ...req.body };
    newFeedback._id = new mongoose.Types.ObjectId();

    console.log("controller addProductReviewFeedback: ", newFeedback);
    //
    const product = await ProductModel.findOne({ _id: productObjId });
    //added feedback
    product.review.feedbacks.push(newFeedback);
    //find avg score
    if (product.review.feedbacks.length > 0) {
      let totalScore = 0;
      product.review.feedbacks.forEach((f) => {
        if (f.stars) totalScore += parseFloat(f.stars);
      });
      product.review.score = (
        totalScore / product.review.feedbacks.length
      ).toFixed(2);
    }
    //update
    const result = await ProductModel.findOneAndUpdate(
      { _id: productObjId },
      { ...product },
      { new: true }
    );
    console.log("addProductReviewFeedback result: ", result);
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

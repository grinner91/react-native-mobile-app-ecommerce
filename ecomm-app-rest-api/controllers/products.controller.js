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

//TODO remove
//just for deve

function generatePictures() {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const idx = randomIntFromInterval(0, 4);
  const picturesUrls = [
    "https://i5.walmartimages.com/asr/52a8a553-1dc9-4263-af1f-c8750bbf7605.b950d0f9a7eb260800e691affbc1e553.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF ",
    "https://i5.walmartimages.com/asr/05373b67-c03b-4ca1-9dfc-a7e42b4dce5b.f9cfbfc82be7b9bcdac035f2897e80d4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/f243bd02-11e4-41fc-aecd-63190edc5e35.3a24d00e2b8799042fd91bc7794d7cc2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/49c96091-fbec-439f-9107-026be670ba73.fe61a794f9e6000732f74a9273adad4e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/c41e05c4-bea2-4c6e-8c8a-289bb624b285.4204ff8f31fd368b426fcfdc74502735.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/c7e13b40-9ed7-4687-8197-fd0e07704d3d_1.6a0bbefffbe6e27cdfe1c34dafae4e56.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  ];
  return [picturesUrls[idx]];
}

import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller.js";

const productsRouter = express.Router({ mergeParams: true });

productsRouter.get("/", getAllProducts);
productsRouter.post("/", addProduct);
productsRouter.put("/:product_id", updateProduct);
productsRouter.delete("/:product_id", deleteProduct);

export default productsRouter;

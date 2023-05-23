import express from "express";
import {
  addProduct,
  addProductReviewFeedback,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import { authUser } from "../middlewares/user.autherization.js";

const productsRouter = express.Router({ mergeParams: true });

productsRouter.get("/", getAllProducts);
productsRouter.post("/", authUser, addProduct);
productsRouter.put("/:product_id", authUser, updateProduct);
productsRouter.delete("/:product_id", authUser, deleteProduct);
productsRouter.put(
  "/:product_id/review/feedbacks",
  authUser,
  addProductReviewFeedback
);

export default productsRouter;

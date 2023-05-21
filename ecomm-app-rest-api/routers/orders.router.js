import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersByUserId,
  updateOrder,
} from "../controllers/orders.controller.js";

const ordersRouter = express.Router({ mergeParams: true });

ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:user_id", getAllOrdersByUserId);
ordersRouter.post("/:user_id", addOrder);
ordersRouter.put("/:order_id", updateOrder);
ordersRouter.delete("/:order_id", deleteOrder);

export default ordersRouter;

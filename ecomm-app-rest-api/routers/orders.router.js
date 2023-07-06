import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersByUserId,
  updateOrder,
} from "../controllers/orders.controller.js";
import { authUser } from "../middlewares/user.autherization.js";

const ordersRouter = express.Router({ mergeParams: true });

ordersRouter.get("/", authUser, getAllOrders);
ordersRouter.get("/:user_id", authUser, getAllOrdersByUserId);
ordersRouter.post("/:user_id", authUser, addOrder);
ordersRouter.put("/:order_id", authUser, updateOrder);
ordersRouter.delete("/:order_id", authUser, deleteOrder);

export default ordersRouter;

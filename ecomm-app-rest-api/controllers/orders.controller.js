import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import { prepareSuccessResponse } from "../utils.js";
import OrderModel from "../models/order.model.js";

export async function getAllOrders(req, res, next) {
  try {
    const { user_id } = req.params;
    console.log("controller getAllOrders");
    const result = await OrderModel.find({
      userId: new mongoose.Types.ObjectId(user_id),
    });
    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function addOrder(req, res, next) {
  try {
    const { user_id } = req.params;
    const orderBody = { ...req.body };
    orderBody._id = new mongoose.Types.ObjectId();
    orderBody.userId = new mongoose.Types.ObjectId(user_id);

    console.log("controller addOrder: ", orderBody);

    //calculate total price
    orderBody.total = orderBody.products.reduce(
      (acc, x) => acc + x.price * x.quantity,
      0
    );
    console.log("order total: ", orderBody.total);

    //save new order
    const newOrder = new OrderModel(orderBody);
    const result = await newOrder.save();

    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function updateOrder(req, res, next) {
  try {
    const { order_id } = req.params;
    const updatedOrder = { ...req.body };
    updatedOrder._id = new mongoose.Types.ObjectId(order_id);

    console.log("controller updatedOrder: ", updatedOrder);
    const result = await OrderModel.findOneAndUpdate(
      { _id: updatedOrder._id },
      { ...updatedOrder },
      { new: true }
    );

    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function deleteOrder(req, res, next) {
  try {
    const { order_id } = req.params;
    console.log("controller deleteOrder: ", order_id);

    const result = await OrderModel.deleteOne({
      _id: new mongoose.Types.ObjectId(order_id),
    });
    res.send(prepareSuccessResponse(result));
  } catch (error) {
    next(error);
  }
}

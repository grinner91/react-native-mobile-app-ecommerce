import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number, // sum of all (product.price * quantity)
  payment: String, //card or cash
  status: String, //ordered, delivered, or canceled
  time: { type: Date, default: Date.now },
});

const OrderModel = model("Order", orderSchema);
export default OrderModel;

/*
Order
{
    _id: ObjectId,
    userId: ObjectId,
    products: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    total: Number, // sum of all (product.price * quantity)
    payment: String, //card or cash
    time: String,
    status: String, //ordered, delivered, or canceled
}

*/

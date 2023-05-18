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
  time: String,
  status: String, //ordered, delivered, or canceled
});

const OrdersModel = model("Orders", orderSchema);
export default OrdersModel;

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

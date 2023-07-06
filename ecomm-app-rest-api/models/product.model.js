import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true }, // text indexing
  category: String,
  price: Number,
  pictures: [],
  review: {
    score: { type: Number, default: 0 }, //average of all stars
    feedbacks: [
      {
        stars: Number, //1, 2, 3, 4, 5
        comment: String,
      },
    ],
  },
  time: { type: Date, default: Date.now },
});

productSchema.index({ name: 1, category: 1 });

const ProductModel = model("Product", productSchema);

export default ProductModel;



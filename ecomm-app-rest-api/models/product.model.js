import { Schema, model } from "mongoose";

const productSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true }, // text indexing
  category: String,
  price: Number,
  pictures: [
    {
      fileName: String,
    },
  ],
  review: {
    score: Number, //average of all stars
    feedbacks: [
      {
        stars: Number, //1, 2, 3, 4, 5
        comment: String,
      },
    ],
  },
  time: String,
});

productSchema.index({ title: 1 });

const ProductsModel = model("Products", productSchema);

export default ProductsModel;

/*
Product
{
    _id: ObjectId,
    name: String,
    images: String,
    category: String,
    price: Number,
    review: {
        score: Number, //average of all stars
        feedbacks: [
            {
                _id: ObjectId
                stars: Number,//1, 2, 3, 4, 5
                comment: String
            }
        ]
    },
    time: String,
}
*/

import mongoose, { Schema, model } from "mongoose";

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
  time: { type: Date, default: Date.now },
});

productSchema.index({ title: 1 });

const ProductModel = model("Product", productSchema);

export default ProductModel;

///////////////////////// for test ///dummy data
export async function insertProductData() {
  try {
    const product = {
      _id: new mongoose.Types.ObjectId(),
      name: "iPhone 12",
      category: "mobile",
      price: 99.0,
      pictures: [],
      review: {
        score: 3.0, //average of all stars
        feedbacks: [],
      },
      time: new Date(),
    };

    const newProduct = new ProductModel(product);
    newProduct.save();
  } catch (error) {
    console.log(error);
  }
}

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

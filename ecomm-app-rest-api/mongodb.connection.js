// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export let db = null;
export const COL_PRODUCTS = "products";

//require("dotenv").config();
// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = "mongodb://localhost:32768";

// export async function connectProductsDb() {
//   try {
//     const localDbUri = "mongodb://localhost:32768";
//     const client = new MongoClient(localDbUri);
//     const conn = await client.connect();
//     db = conn.db(COL_PRODUCTS);
//   } catch (error) {
//     console.log("db connection error: ", error);
//   }
// }

export const connectProductsDb = async () => {
  try {
    const result = await mongoose.connect(MONGODB_URI);
    //console.log("connection result: ", result);
    console.log("MongoDB connected!");
    return;
  } catch (e) {
    console.log(`MongoDB connection error ${e}`);
  }
};

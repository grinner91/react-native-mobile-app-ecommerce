import express from "express";
import cors from "cors";

import ProductsModel from "./models/product.model.js";
import { connectProductsDb } from "./mongodb.connection.js";

const app = express();
app.use(cors());
app.use(express.json());

connectProductsDb()
  .then((res) => {
    console.log("db connection res: ", res);
  })
  .catch((err) => {
    console.log("db connection err: ", err);
  });

app.get("/products", async (req, res, next) => {
  try {
    const result = await ProductsModel.find({}).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.use("*", async (req, res, next) => {
  res.status(404);
  res.send("No router found");
});

app.use((error, req, res, next) => {
  res.status(500);
  res.send("Internal server error!!!");
});

app.listen(3000, () => {
  console.log("MAD571-FinalProject-Products: server running....");
});

/////////////////////////
async function initInsertData() {
  //
}

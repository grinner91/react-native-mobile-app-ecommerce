import express from "express";
import cors from "cors";

import { connectProductsDb } from "./mongodb.connection.js";
import productsRouter from "./routers/products.router.js";
import usersRouter from "./routers/users.router.js";
import ordersRouter from "./routers/orders.router.js";
import { authUser } from "./middlewares/user.autherization.js";

const app = express();
app.use(cors());
app.use(express.json());

connectProductsDb()
  .then((res) => {
    console.log("db connection res: ", res);
    //insertProductData();
  })
  .catch((err) => {
    console.log("db connection err: ", err);
  });

app.use("/api/v1/users", authUser, usersRouter);
app.use("/api/v1/products", authUser, productsRouter);
app.use("/api/v1/orders", authUser, ordersRouter);

app.use("*", async (req, res, next) => {
  res.status(404);
  res.send("No router found");
});

app.use((error, req, res, next) => {
  console.log("error: ", error);
  res.status(500);
  res.send("Internal server error!!!");
});

app.listen(3000, () => {
  console.log("MAD571-FinalProject-Products: server running....");
});

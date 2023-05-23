//TODO remove
//just for deve

import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export async function clearAllTestData() {
  try {
    console.log("clearAllData start....");
    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
    console.log("clearAllData done....");
  } catch (error) {
    console.log("clearAllData error: ", error);
  }
}

export async function insertTestAllData() {
  try {
    console.log("insertTestAllData start...");
    await insertUsers();
    await insertProducts();
    await insertOrders();
    console.log("insertTestAllData done...");
  } catch (error) {
    console.log("insertTestAllData err: ", error);
  }
}

///////////////////////// for test ///dummy data

async function insertUsers() {
  try {
    console.log("insertUsers start...");
    // password: 123, hash:  '$2b$10$M0PhOC.s9hModFr93YhBDuB9JJahxLzPLHm71BK58PBSG0HnlJlWm',
    const admin = {
      _id: new mongoose.Types.ObjectId(),
      email: "admin@miu.edu",
      password: "$2b$10$M0PhOC.s9hModFr93YhBDuB9JJahxLzPLHm71BK58PBSG0HnlJlWm",
      fullname: "Admin Admin",
      role: "admin", //customer or admin,
      disable: false,
    };

    const monir = {
      _id: new mongoose.Types.ObjectId(),
      email: "zaman@miu.edu",
      password: "$2b$10$M0PhOC.s9hModFr93YhBDuB9JJahxLzPLHm71BK58PBSG0HnlJlWm",
      fullname: "Mohamad Monir",
      role: "customer", //customer or admin,
      disable: false,
    };
    await UserModel.insertMany([admin, monir]);
    console.log("insertUsers done...");
  } catch (error) {
    console.log(error);
  }
}

async function insertProducts() {
  try {
    console.log("insertProducts start...");
    const p1 = {
      _id: new mongoose.Types.ObjectId(),
      name: "iPhone 12",
      category: "mobile",
      price: 99.0,
      pictures: generatePictures(),
      review: {
        score: 5.0,
        feedbacks: [
          { comment: "wow", stars: 5 },
          { comment: "good", stars: 3 },
        ],
      },
      time: new Date(),
    };

    const p2 = {
      _id: new mongoose.Types.ObjectId(),
      name: "Macbook pro",
      category: "latop",
      price: 2345.0,
      pictures: generatePictures(),
      review: {
        score: 3.0,
        feedbacks: [
          { comment: "wow", stars: 5 },
          { comment: "good", stars: 3 },
        ],
      },
      time: new Date(),
    };

    const p3 = {
      _id: new mongoose.Types.ObjectId(),
      name: "Kids toy",
      category: "toy",
      price: 150.0,
      pictures: generatePictures(),
      review: {
        score: 1.0,
        feedbacks: [
          { comment: "awsome", stars: 5 },
          { comment: "not good", stars: 1 },
        ],
      },
      time: new Date(),
    };

    const p4 = {
      _id: new mongoose.Types.ObjectId(),
      name: "Earbuds Pro",
      category: "Earbuds",
      price: 150.0,
      pictures: generatePictures(),
      review: {
        score: 2.0,
        feedbacks: [
          { comment: "excellent", stars: 5 },
          { comment: "great", stars: 4 },
        ],
      },
      time: new Date(),
    };

    await ProductModel.insertMany([p1, p2, p3, p4]);
    console.log("insertProducts done...");
  } catch (error) {
    console.log("insertProducts error: ", error);
  }
}

async function insertOrders() {
  try {
    console.log("insertOrders start...");
    const users = await UserModel.find({});
    const products = await ProductModel.find({});
    const orders = [];
    users.forEach((u) => {
      //console.log("user: ", u);
      [...Array(5)].forEach(() => {
        const orderItem = createOrder(u, products);
        orders.push({ ...orderItem });
      });
    });
    products.forEach((p) => {
      console.log("product: ", p);
    });
    // console.log("users: ", users);
    // console.log("prods: ", products);
    await OrderModel.insertMany([...orders]);
    console.log("insertOrders done...");
  } catch (error) {
    console.log("insert orders: ", error);
  }
}

function createOrder(user, prodList) {
  const l = 0;
  const h = prodList.length - 1;

  const p1 = { ...prodList[randNum(l, h)] };
  p1.quantity = randNum(1, 10);
  p1.total = randNum(100, 500);

  const p2 = { ...prodList[randNum(l, h)] };
  p2.quantity = randNum(1, 10);
  p2.total = randNum(100, 500);

  const order = {
    _id: new mongoose.Types.ObjectId(),
    userId: user._id,
    products: [{ ...p1 }, { ...p2 }],
    payment: "card",
    status: "ordered",
    total: randNum(555, 999),
  };
  return order;
}

function createOrderProduct(prodList) {}

/*

{
    "userId": "6466efdc68335b913881b19f",
    "products": [
        {
            "_id": "646931e91409d106aa762b39",
            "name": "Watch 5",
            "category": "watch",
            "price": 800,
            "quantity":1,
            "pictures": [
                "https://i5.walmartimages.com/asr/49c96091-fbec-439f-9107-026be670ba73.fe61a794f9e6000732f74a9273adad4e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            ]
        },
        {
            "_id": "646931d61409d106aa762b37",
            "name": "Macbook Pro",
            "category": "laptop",
            "price": 800,
            "quantity":3,
            "pictures": [
                "https://i5.walmartimages.com/asr/f243bd02-11e4-41fc-aecd-63190edc5e35.3a24d00e2b8799042fd91bc7794d7cc2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            ]
        }
    ],
    "payment": "card",
    "status": "ordered"
}
*/
function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePictures() {
  const idx = randNum(0, 4);
  const picturesUrls = [
    "https://i5.walmartimages.com/asr/52a8a553-1dc9-4263-af1f-c8750bbf7605.b950d0f9a7eb260800e691affbc1e553.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF ",
    "https://i5.walmartimages.com/asr/05373b67-c03b-4ca1-9dfc-a7e42b4dce5b.f9cfbfc82be7b9bcdac035f2897e80d4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/f243bd02-11e4-41fc-aecd-63190edc5e35.3a24d00e2b8799042fd91bc7794d7cc2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/49c96091-fbec-439f-9107-026be670ba73.fe61a794f9e6000732f74a9273adad4e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/c41e05c4-bea2-4c6e-8c8a-289bb624b285.4204ff8f31fd368b426fcfdc74502735.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/c7e13b40-9ed7-4687-8197-fd0e07704d3d_1.6a0bbefffbe6e27cdfe1c34dafae4e56.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  ];
  return [picturesUrls[idx]];
}

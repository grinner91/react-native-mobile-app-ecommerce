export const createCustomerOrder = (userId, cart, payment = "card") => {
  const newOrder = {
    userId: userId,
    total: 0,
    products: [],
    payment: payment,
    status: "ordered",
  };
  let totalCost = 0;
  for (let item of cart) {
    //console.log("cart item: ", item);
    const product = item.product;
    const newProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      pictures: product.pictures,
      quantity: item.quantity,
      total: item.total,
    };
    totalCost += newProduct.price * newProduct.quantity;
    newOrder.products.push(newProduct);
  }
  newOrder.total = totalCost.toFixed(2);
  return newOrder;
};

export const createUpdatedStateObj = (prevState, loggedinUser) => {
  const updatedState = {
    ...prevState,
    user: {
      _id: loggedinUser._id,
      email: loggedinUser.email,
      fullname: loggedinUser.fullname,
      role: loggedinUser.role,
    },
    token: loggedinUser.jwt,
    isLoggedin: true,
  };
  return updatedState;
};

/*


{
            "_id": "64692c1c97e319546cfd207a",
            "userId": "6466efdc68335b913881b19f",
            "products": [
                {
                    "name": "iPhone 12",
                    "price": 99,
                    "quantity": 5,
                    "_id": "6466d772434af5bc980a0645"
                }
            ],
            "total": 495,
            "payment": "card",
            "status": "ordered",
            "time": "2023-05-20T20:22:52.398Z",
            "__v": 0
        },
*/

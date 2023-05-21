import { getSecureHttp } from "./base.http.js";

export const fetchAllOrders = async (userId) => {
  try {
    let url = "";
    if (userId) url = "/api/v1/orders/" + userId;
    else url = "/api/v1/orders/6466efdc68335b913881b19f"; //TODO for test remove
    //
    //console.log(" fetchAllOrders url: ", url);
    const response = await getSecureHttp().get(url);
    const json = response;
    //console.log(" fetchAllOrders json: ", json);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrderRequest = async (orderId, orderStatus) => {
  try {
    //console.log("updateOrderRequest orderId: ", orderId);
    let url = "";
    if (orderId) url = "/api/v1/orders/" + orderId;

    console.log(" updateOrderRequest url: ", url);
    const response = await getSecureHttp().put(url, {
      status: orderStatus,
    });
    const json = response;
    console.log("updateOrderRequest json: ", json);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutOrder = async (data) => {
  try {
    console.log("checkoutOrder data: ", { ...data });
    const response = await getSecureHttp().post("/api/v1/orders", { ...data });
    const json = response;
    console.log(" checkoutOrder json: ", json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

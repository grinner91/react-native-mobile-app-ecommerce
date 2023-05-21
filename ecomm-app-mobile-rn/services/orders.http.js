import { getSecureHttp } from "./base.http.js";

export const fetchAllOrders = async () => {
  try {
    let url = `/api/v1/orders`;
    console.log(" fetchAllOrders url: ", url);
    const response = await getSecureHttp().get(url);
    const json = response;
    //console.log(" fetchAllOrders json: ", json);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllOrdersByUser = async (userId) => {
  try {
    let url = "";
    if (userId) url = `/api/v1/orders/${userId}`;
    //else url = "/api/v1/orders/"; //TODO for test remove
    //
    console.log(" fetchAllOrders url: ", url);
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
    if (orderId) url = `/api/v1/orders/${orderId}`;
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

export const checkoutOrderRequest = async (data) => {
  try {
    //console.log("checkoutOrderRequest data: ", { ...data });
    const url = `/api/v1/orders/${data.userId}`;
    const response = await getSecureHttp().post(url, { ...data });
    const json = response;
    //console.log(" checkoutOrderRequest json: ", json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

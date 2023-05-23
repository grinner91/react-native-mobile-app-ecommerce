import { getSecureHttp } from "./base.http.js";

export const fetchPaymentClientSecret = async () => {
  try {
    const data = {
      currency: "usd",
      items: [{ id: "id" }],
    };
    const response = await getSecureHttp().post(
      "/api/v1/create-payment-intent",
      { ...data }
    );
    console.log("fetchPaymentClientSecret data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("fetchPaymentClientSecret: ", error);
  }
};

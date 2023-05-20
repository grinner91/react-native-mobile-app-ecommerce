import { getSecureHttp } from "./base.http.js";

export const fetchAllProducts = async () => {
  try {
    const response = await getSecureHttp().get("/api/v1/products");
    const json = response;
    //console.log(" fetchAllProducts json: ", json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

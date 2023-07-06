import axios from "axios";

import { retrieveToken } from "../common/app.localstore.js";

//export const baseUrl = "http://localhost:3000";
export const baseUrl = "http://172.17.141.117:3000";

//default for testing
let userJWTToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2ZWZkYzY4MzM1YjkxMzg4MWIxOWYiLCJlbWFpbCI6ImFkbWluQG1pdS5lZHUiLCJmdWxsbmFtZSI6IlJhZnNhbiBaYW1hbiIsImlhdCI6MTY4NDYwMDQ5Mn0.ygL_jhQD4uYhBoL1S2KDjtrhijaDDSXaoLdqQ3Uk99Y";

export const setJwtToken = (token) => {
  console.log("setJwtToken  ", token);
  userJWTToken = token;
};

export const getSecureHttp = () => {
  //const token = retrieveToken(); //reduxStoreState?.authentication?.value?.token;

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (userJWTToken) {
    headers = { ...headers, Authorization: `Bearer ${userJWTToken}` };
  }
  let instance = axios.create({
    baseURL: `${baseUrl}`,
    headers: headers,
  });
  return instance;
};

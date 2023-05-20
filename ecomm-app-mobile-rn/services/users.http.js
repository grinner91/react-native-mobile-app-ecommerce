import { getSecureHttp } from "./base.http.js";

export const sendLoginRequest = async (email, password) => {
  try {
    const response = await getSecureHttp().post("/api/v1/users/login", {
      email,
      password,
    });
    const json = response;
    console.log("sendLoginRequest json: ", json);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};






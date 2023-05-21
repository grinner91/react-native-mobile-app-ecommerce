import { getSecureHttp } from "./base.http.js";

export const sendLoginRequest = async (email, password) => {
  try {
    const response = await getSecureHttp().post("/api/v1/users/login", {
      email,
      password,
    });
    const json = response;
    console.log("sendLoginRequest json: ", json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendSignupRequest = async (newUser) => {
  try {
    const response = await getSecureHttp().post("/api/v1/users/signup", {
      ...newUser,
    });
    const json = response;
    console.log("sendSignupRequest json: ", json);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

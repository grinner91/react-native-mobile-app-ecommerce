import { getSecureHttp } from "./base.http.js";

export const sendLoginRequest = async (email, password) => {
  try {
    const response = await getSecureHttp().post("/api/v1/users/login", {
      email,
      password,
    });
    console.log("sendLoginRequest json: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendSignupRequest = async (newUser) => {
  try {
    const response = await getSecureHttp().post("/api/v1/users/signup", {
      ...newUser,
    });

    console.log("sendSignupRequest json: ", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await getSecureHttp().get("/api/v1/users");
    console.log("fetchAllUsers json: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserRequest = async (userId, data) => {
  try {
    const url = `/api/v1/users/${userId}`;
    console.log("updateUserStatusRequest: ", url, ", data: ", {
      ...data,
    });
    const response = await getSecureHttp().put(url, {
      ...data,
    });
    console.log("updateUserStatusRequest res: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";

const ECOMM_APP_STORE_MAD517 = "ECOMM_APP_STORE_MAD517";

export const saveState = async (state) => {
  try {
    //console.log("JSON.stringify(state): ", JSON.stringify(state));
    AsyncStorage.setItem(ECOMM_APP_STORE_MAD517, JSON.stringify(state));
  } catch (error) {
    console.log("saveState error: ", error);
  }
};

export const retrieveState = async () => {
  try {
    let data = await AsyncStorage.getItem(ECOMM_APP_STORE_MAD517);
    if (data) {
      //console.log("retrieveState(): ", JSON.parse(data));
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("retrieveState error: ", error);
  }
  return [];
};

export const retrieveToken = async () => {
  try {
    let data = await AsyncStorage.getItem(ECOMM_APP_STORE_MAD517);
    if (data) {
      const state = JSON.parse(data);
      return state.token;
    }
  } catch (error) {
    console.log("retrieveToken error: ", error);
  }
  return "";
};

export const retrieveUser = async () => {
  try {
    let data = await AsyncStorage.getItem(ECOMM_APP_STORE_MAD517);
    if (data) {
      const state = JSON.parse(data);
      return state.user;
    }
  } catch (error) {
    console.log("retrieveUser error: ", error);
  }
  return null;
};

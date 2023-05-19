import AsyncStorage from "@react-native-async-storage/async-storage";

const ECOMM_APP_STORE_MAD517 = "ECOMM_APP_STORE_MAD517";

export const saveState = async (state) => {
  try {
    AsyncStorage.setItem(ECOMM_APP_STORE_MAD517, JSON.stringify(state));
  } catch (error) {
    console.log("saveState error: ", error);
  }
};

export const retrieveState = async () => {
  try {
    let data = await AsyncStorage.getItem(ECOMM_APP_STORE_MAD517);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("retrieveState error: ", error);
  }
  return [];
};


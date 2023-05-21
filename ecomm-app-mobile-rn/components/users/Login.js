import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { styles } from "../../styles/styles.js";
import { ACTIONS, AppContext } from "../../common/app.context.js";
import { sendLoginRequest } from "../../services/users.http.js";
import { CUSTOMERS_PAGE } from "../../common/constants.js";
import { createUpdatedStateObj } from "../../common/utils.js";
import { saveState } from "../../common/app.localstore.js";
import { SafeAreaView } from "react-native-safe-area-context";

export const Login = () => {
  const navigation = useNavigation();
  const { state, dispatch, onLoggedin } = useContext(AppContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    isLoggedin: false,
    isSubmitting: false,
  });

  useEffect(() => {
    setUser({ email: "admin@miu.edu", password: "123" });
  }, []);

  const onLoginPress = () => {
    //setUser((prevState) => ({ ...prevState, isSubmitting: true }));
    console.log("user login: ", user.email, ", ", user.password);
    if (user.email && user.password) {
      sendLoginRequest(user.email, user.password)
        .then((res) => {
          console.log("Login UI res: ", res.data);
          if (res.success) {
            const updatedState = createUpdatedStateObj(state, res.data);
            dispatch({ type: ACTIONS.SIGN_IN, payload: updatedState });
            //saveState(updatedState);
            onLoggedin(); //App reload
            navigation.navigate(CUSTOMERS_PAGE.PRODUCTS_LIST);
          } else {
            Alert.alert("" + res.data.msg);
          }
        })
        .catch((err) => {
          console.log("Login UI err: ", err);
        });
    }
    //navigation.navigate("ProductsList");
    //  setTimeout(() => {
    //  setUser((prevState) => ({ ...prevState, isSubmitting: false }));
    //  }, 1000);
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={user.email}
            inputMode="email"
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, email: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            value={user.password}
            textContentType="password"
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, password: text }))
            }
          />

          <TouchableHighlight
            style={[styles.button]}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.submitButtonText}>Login</Text>
          </TouchableHighlight>

          {user.isSubmitting ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
/*

Login UI res:  Object {
  "data": Object {
    "_id": "6466efdc68335b913881b19f",
    "email": "admin@miu.edu",
    "fullname": "Rafsan Zaman",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2ZWZkYzY4MzM1YjkxMzg4MWIxOWYiLCJlbWFpbCI6ImFkbWluQG1pdS5lZHUiLCJmdWxsbmFtZSI6IlJhZnNhbiBaYW1hbiIsImlhdCI6MTY4NDYwMDQ5Mn0.ygL_jhQD4uYhBoL1S2KDjtrhijaDDSXaoLdqQ3Uk99Y",
  },
  "success": true,
}

*/

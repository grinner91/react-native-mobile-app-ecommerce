import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { styles } from "../../styles/styles.js";
import { ACTIONS, AppContext } from "../../common/app.context.js";
import { sendLoginRequest } from "../../services/users.http.js";

export const Login = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    isLoggedin: false,
    isSubmitting: false,
  });

  useEffect(() => {
    setUser({ email: "admin@miu.edu", password: "123" });
  }, []);

  const onLogin = () => {
    //setUser((prevState) => ({ ...prevState, isSubmitting: true }));
    if (user.email && user.password) {
      sendLoginRequest(user.email, user.password)
        .then((res) => {
          console.log("Login UI res: ", res);
          dispatch({ type: ACTIONS.SIGN_IN, payload: res.data });
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

  const onSignup = () => {};

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={user.email}
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

      <TouchableHighlight style={[styles.button]} onPress={() => onLogin()}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.button]} onPress={() => onSignup()}>
        <Text style={styles.submitButtonText}>Signup</Text>
      </TouchableHighlight>
      {user.isSubmitting ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </KeyboardAwareScrollView>
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

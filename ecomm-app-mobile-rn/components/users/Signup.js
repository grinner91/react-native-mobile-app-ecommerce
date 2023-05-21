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
import { CUSTOMERS_PAGE } from "../../common/constants.js";
import { createUpdatedStateObj } from "../../common/utils.js";
import { sendSignupRequest } from "../../services/users.http.js";

export const Signup = () => {
  const navigation = useNavigation();
  const { state, dispatch, onLoggedin } = useContext(AppContext);
  const [user, setUser] = useState({
    email: "u7@miu.edu",
    password: "123",
    fullname: "Tomas Adison",
    role: "customer",
    isLoggedin: false,
    isSubmitting: false,
    address: "1000 N 4th St",
    phone: "64123393",
    city: "Fairfield",
    state: "Iowa",
    zipcode: "IA 52557",
    country: "USA",
  });

  useEffect(() => {
    //setUser();
  }, []);

  const onSignupPress = () => {
    //setUser((prevState) => ({ ...prevState, isSubmitting: true }));
    if (user.email && user.password && user.fullname) {
      const newUser = {
        email: user.email,
        password: user.password,
        fullname: user.fullname,
        role: user.role,
        address: {
          address: user.address,
          phone: user.phone,
          city: user.city,
          state: user.state,
          zipcode: user.zipcode,
          country: user.country,
        },
      };
      sendSignupRequest(newUser)
        .then((res) => {
          console.log("Signup UI res: ", res.data);
          if (res.success && res.data._id) {
            const updatedState = createUpdatedStateObj(state, res.data);
            dispatch({ type: ACTIONS.SIGN_IN, payload: updatedState });
            onLoggedin(); //App reload
            navigation.navigate(CUSTOMERS_PAGE.PRODUCTS_LIST);
          }
        })
        .catch((err) => {
          console.log("Signup UI err: ", err);
        });
    } else {
      Alert.alert("Please, fill up email, password, full name to signup.");
    }
    //navigation.navigate("");
    //  setTimeout(() => {
    //  setUser((prevState) => ({ ...prevState, isSubmitting: false }));
    //  }, 1000);
  };

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <View>
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="email"
            value={user.email}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, email: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            value={user.password}
            textContentType="password"
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, password: text }))
            }
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="full name"
            value={user.fullname}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, fullname: text }))
            }
          />
        </View>
        <View>
          <Text>Address details: </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="street address"
            value={user.address}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, address: text }))
            }
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="phone number"
            keyboardType="phone-pad"
            value={user.phone}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, phone: text }))
            }
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="city "
            value={user.city}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, city: text }))
            }
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="state"
            value={user.state}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, state: text }))
            }
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="zip code "
            value={user.zipcode}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, zipcode: text }))
            }
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="country "
            value={user.country}
            onChangeText={(text) =>
              setUser((prevState) => ({ ...prevState, country: text }))
            }
          />
        </View>
        <View>
          <TouchableHighlight
            style={[styles.button]}
            onPress={() => onSignupPress()}
          >
            <Text style={styles.submitButtonText}>Signup</Text>
          </TouchableHighlight>
        </View>
        {user.isSubmitting ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
};
/*

Signup UI res:  Object {
  "data": Object {
    "_id": "6466efdc68335b913881b19f",
    "email": "admin@miu.edu",
    "fullname": "Rafsan Zaman",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2ZWZkYzY4MzM1YjkxMzg4MWIxOWYiLCJlbWFpbCI6ImFkbWluQG1pdS5lZHUiLCJmdWxsbmFtZSI6IlJhZnNhbiBaYW1hbiIsImlhdCI6MTY4NDYwMDQ5Mn0.ygL_jhQD4uYhBoL1S2KDjtrhijaDDSXaoLdqQ3Uk99Y",
  },
  "success": true,
}

*/

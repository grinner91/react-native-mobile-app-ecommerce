import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { styles } from "../../styles/styles.js";

export const CartShippingAddress = ({ route }) => {
  const navigation = useNavigation();
  const { address } = route.params;
  const [state, setState] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
    submitting: false,
  });

  useEffect(() => {
    if (address) {
      setState((prevState) => ({ ...prevState, ...address }));
    }
  }, []);

  const submitAddress = () => {
    //setState((prevState) => ({ ...prevState, submitting: true }));
    if (state.address && state.state && state.zipcode) {
      //
      const newAddress = {
        address: state.address,
        city: state.city,
        state: state.state,
        zipcode: state.zipcode,
      };
      //add to user's address list
    }
    navigation.navigate("CartCheckout");
    // setTimeout(() => {
    //   setState((prevState) => ({ ...prevState, submitting: false }));
    // }, 1000);
  };
  return (
    <KeyboardAwareScrollView style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="address"
        value={state.title}
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, address: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="city"
        value={state.faculty}
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, city: text }))
        }
      />
      <TextInput
        style={styles.input}
        value={state.code}
        placeholder="state"
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, state: text }))
        }
      />
      <TextInput
        style={styles.input}
        value={state.code}
        placeholder="zipcode"
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, zipcode: text }))
        }
      />
      <TouchableHighlight
        style={[styles.submitButton, styles.input]}
        onPress={() => submitAddress()}
      >
        <Text style={styles.submitButtonText}>Add</Text>
      </TouchableHighlight>
      {state.submitting ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </KeyboardAwareScrollView>
  );
};

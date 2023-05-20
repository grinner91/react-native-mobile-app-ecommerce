import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { styles } from "../../styles/styles";

export const AddEditProduct = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const [state, setState] = useState({
    name: "",
    category: "",
    price: 0.0,
    submitting: false,
  });

  useEffect(() => {
    if (product) {
      setState({ ...product });
    }
  }, []);

  const onSubmit = () => {
    //setState((prevState) => ({ ...prevState, submitting: true }));
    if (state.name && state.price && state.category) {
      //
      const product = {
        name: state.name,
        price: state.price,
        category: state.category,
      };
      //save to database

      //navigate to Product list

      navigation.navigate("AdminProductsList");
    }

    // setTimeout(() => {
    //   setState((prevState) => ({ ...prevState, submitting: false }));
    // }, 1000);
  };
  return (
    <KeyboardAwareScrollView style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={state.name}
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, name: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="category"
        value={state.category}
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, category: text }))
        }
      />
      <TextInput
        style={styles.input}
        value={state.price}
        placeholder="price"
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, price: text }))
        }
      />
      <TouchableHighlight style={[styles.button]} onPress={() => onSubmit()}>
        <Text style={styles.submitButtonText}>Save</Text>
      </TouchableHighlight>
      {state.submitting ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </KeyboardAwareScrollView>
  );
};

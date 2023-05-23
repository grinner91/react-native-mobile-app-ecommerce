import { useNavigation, StackActions } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { styles } from "../../styles/styles";
import { saveProductRequest } from "../../services/products.http";
import { AdminContext } from "../../common/admin.context";
import { PhotoUploadAwsS3 } from "./PhotoUploadAwsS3";

export const AddEditProduct = ({ route }) => {
  const navigation = useNavigation();
  const { reloadProducts, setReloadProducts } = useContext(AdminContext);
  const { product } = route.params;
  const [state, setState] = useState({
    name: "iPhone 14",
    category: "mobile",
    price: "899",
    submitting: false,
  });

  useEffect(() => {
    if (product) {
      setState({ ...product, price: "" + product.price });
      console.log("AddEditProduct: ", { ...product });
    }
  }, []);

  const onSubmit = () => {
    setState((prevState) => ({ ...prevState, submitting: true }));
    if (state.name && state.price && state.category) {
      //
      let newProduct = {
        name: state.name,
        price: parseFloat(state.price),
        category: state.category,
      };
      if (product) {
        newProduct = { ...product, ...newProduct };
      }

      //save to database
      saveProductRequest(newProduct)
        .then((res) => {
          //navigate to Product list
          if (res.success) {
            //console.log("saveProductRequest res: ", res);
            setReloadProducts(!reloadProducts);
            const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
          }
        })
        .catch((err) => {
          console.log("AddEditProduct err: ", err);
        });
    }

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, submitting: false }));
    }, 1000);
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
        autoCapitalize="none"
        value={state.category}
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, category: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="price"
        autoCapitalize="none"
        value={state.price}
        onChangeText={(text) =>
          setState((prevState) => ({ ...prevState, price: text }))
        }
      />

      <PhotoUploadAwsS3 />
      <TouchableHighlight
        style={[styles.button, styles.adminColor]}
        onPress={() => onSubmit()}
      >
        <Text style={styles.submitButtonText}>Save</Text>
      </TouchableHighlight>
      {state.submitting ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </KeyboardAwareScrollView>
  );
};

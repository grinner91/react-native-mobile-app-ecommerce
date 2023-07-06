import { Text, View, Image, TouchableHighlight } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { Quantity } from "./Quantity";
import { AppContext, ACTIONS } from "../common/app.context.js";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";

export const CustomerProduct = ({ product }) => {
  const { state, dispatch } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    //console.log("product details: ", product);
  }, []);

  const onAddCart = () => {
    if (quantity > 0) {
      //console.log("quantity: ", quantity);
      const newCartItem = {
        product: product,
        quantity: quantity,
        total: parseInt(quantity) * parseFloat(product.price),
      };

      dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: newCartItem,
      });
      //setQuantity(0);
      //console.log("state after add to cart: ", state.cart);
    }
  };

  const onQuantityChange = (value) => {
    setQuantity(value);
  };

  const showReviewScoreUI = () => {
    if (product && product.review && product.review.score) {
      //console.log("showReviewScoreUI stars: " + product.review.score);
      return (
        <Stars
          {...{ rating: product.review.score, total: product.review.score }}
        />
      );
    } else return "";
  };

  return (
    <View style={[styles.content]}>
      <View style={{ flexDirection: "row" }}>
        {product.pictures && product.pictures.length > 0 ? (
          <Image
            source={{ uri: product.pictures[0] }}
            style={styles.imagePreview}
          />
        ) : (
          ""
        )}

        <View style={{ flexDirection: "column" }}>
          <Text style={styles.title2}> {product.name}</Text>
          <Text> {"Price $" + product.price}</Text>
          {showReviewScoreUI()}
        </View>
      </View>
      <View style={[{ flexDirection: "row" }]}>
        <Quantity {...{ onQuantityChange }} />

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            onAddCart();
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableHighlight>
        {/* <TouchableHighlight style={styles.button} onPress={() => {navigation.push("")}}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableHighlight> */}
      </View>
    </View>
  );
};
/*

product details:  Object {
  "__v": 0,
  "_id": "6466dc2e7710c32531b34646",
  "category": "mobile",
  "name": " Samsung Galaxy Ultra23",
  "pictures": Array [],
  "price": 97,
  "review": Object {
    "feedbacks": Array [],
    "score": 4,
  },
  "time": "2023-05-19T02:17:18.555Z",
}

*/

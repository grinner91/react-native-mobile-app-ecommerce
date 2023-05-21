import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { styles } from "../styles/styles";

export const Quantity = ({ onQuantityChange }) => {
  //console.log("Quantity props: ", onQuantityChange);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {}, []);
  const didDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevState) => prevState - 1);
      onQuantityChange(quantity);
    }
  };
  const didIncrement = () => {
    setQuantity((prevState) => prevState + 1);
    onQuantityChange(quantity);
  };
  return (
    <View style={[{ flexDirection: "row" }]}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          didDecrement();
        }}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableHighlight>
      <Text style={[{ paddingTop: 10 }]}>{quantity}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          didIncrement();
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableHighlight>
    </View>
  );
};

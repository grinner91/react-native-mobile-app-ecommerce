import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { styles } from "../../styles/styles.js";
import { TouchableHighlight } from "react-native-gesture-handler";

export const CartItem = ({ item, onRemoveCartItem }) => {
  //console.log("CartItem: ", item);

  return (
    <View style={[styles.content]}>
      <Text>{item.product.name}</Text>
      <Text> {"quantity: " + item.quantity}</Text>
      <Text>{"total : $" + item.total}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          onRemoveCartItem(item);
        }}
      >
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableHighlight>
    </View>
  );
};

import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { styles } from "../../styles/styles.js";

export const CartItem = ({ item }) => {
  //console.log("CartItem: ", item);
  return (
    <View style={[styles.content]}>
      <Text>{item.product.name}</Text>
      <Text> {"units: " + item.quantity}</Text>
      <Text>{"total : $" + item.total}</Text>
    </View>
  );
};

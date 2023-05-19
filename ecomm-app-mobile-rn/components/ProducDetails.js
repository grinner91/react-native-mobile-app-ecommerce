import { Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native";

export const Product = ({ product }) => {
  useEffect(() => {
    //console.log("product details: ", product);
  }, []);
  const imageUri =
    "https://i5.walmartimages.com/asr/52a8a553-1dc9-4263-af1f-c8750bbf7605.b950d0f9a7eb260800e691affbc1e553.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF ";
  return (
    <View style={[styles.content, { flexDirection: "row" }]}>
      <Text>Product Details</Text>
      <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      <View style={{ flexDirection: "column" }}>
        <Text>{product.name}</Text>
        <Text>{product.price}</Text>
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

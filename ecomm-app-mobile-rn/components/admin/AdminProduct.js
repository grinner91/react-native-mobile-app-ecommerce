import { Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/styles.js";

export const AdminProduct = ({ product }) => {
  const navigation = useNavigation();
  useEffect(() => {
    //console.log("product details: ", product);
  }, []);

  const onEdit = () => {
    navigation.navigate("AddEditProduct", { product });
  };

  const onDelete = () => {};

  const imageUri =
    "https://i5.walmartimages.com/asr/52a8a553-1dc9-4263-af1f-c8750bbf7605.b950d0f9a7eb260800e691affbc1e553.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF ";

  return (
    <View style={[styles.content]}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.title2}> {" " + product.name}</Text>
          <Text> {" price " + product.price}</Text>
        </View>
      </View>
      <View style={[{ flexDirection: "row" }]}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            onEdit();
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            onDelete();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
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

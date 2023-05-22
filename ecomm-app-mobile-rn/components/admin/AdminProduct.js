import { Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/styles.js";
import { deleteProductRequest } from "../../services/products.http.js";
import { AdminContext } from "../../common/admin.context.js";

export const AdminProduct = ({ product }) => {
  const navigation = useNavigation();
  const { reloadProducts, setReloadProducts } = useContext(AdminContext);
  useEffect(() => {
    //console.log("product details: ", product);
  }, []);

  const onEdit = () => {
    navigation.navigate("AddEditProduct", { product });
  };

  const onDelete = () => {
    if (product && product._id) {
      deleteProductRequest(product._id)
        .then((res) => {
          if (res.success) {
            setReloadProducts(!reloadProducts);
          }
        })
        .catch((err) => console.log("AdminProduct delete err: ", err));
    }
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
          <Text style={styles.title2}> {" " + product.name}</Text>
          <Text> {"price $" + product.price}</Text>
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

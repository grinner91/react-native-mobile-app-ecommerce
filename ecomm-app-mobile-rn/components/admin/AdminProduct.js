import { Text, View, Image, TouchableHighlight } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/styles.js";
import { deleteProductRequest } from "../../services/products.http.js";
import { AdminContext } from "../../common/admin.context.js";
import Stars from "../Stars.js";

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

  const showReviewScoreUI = () => {
    if (product && product.review && product.review.score)
      return (
        <Stars
          {...{ rating: product.review.score, total: product.review.score }}
        />
      );
    else return "";
  };

  return (
    <View style={[styles.content, styles.adminColor]}>
      <View style={{ flexDirection: "row" }}>
        {product.pictures && product.pictures.length > 0 ? (
          <Image
            source={{ uri: product.pictures[0] }}
            style={[styles.imagePreview, styles.adminColor]}
          />
        ) : (
          ""
        )}
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={styles.title2}> {product.name}</Text>
          <Text> {"price $" + product.price}</Text>
          {showReviewScoreUI()}
        </View>
      </View>
      <View style={[{ flexDirection: "row" }]}>
        <TouchableHighlight
          style={[styles.button, styles.adminColor]}
          onPress={() => {
            onEdit();
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.adminColor]}
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

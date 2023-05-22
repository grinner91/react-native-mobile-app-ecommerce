import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../styles/styles";

export const AdminOrderProductItem = ({ product }) => {
  console.log("AdminOrderProductItem item: ", product);

  useEffect(() => {}, []);

  return (
    <View style={[{ flexDirection: "row" }]}>
      {product.pictures && product.pictures.length > 0 ? (
        <Image
          source={{ uri: product.pictures[0] }}
          style={styles.imagePreview}
        />
      ) : (
        ""
      )}
      <View style={[{ flexDirection: "column", margin: 10 }]}>
        <Text style={styles.title3}>{product.name}</Text>
        <Text>{"price $" + product.price}</Text>
        <Text>{"quantity: " + product.quantity}</Text>
      </View>
    </View>
  );
};

import { Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { styles } from "../../styles/styles";

export const CustomerOrder = ({ order }) => {
  useEffect(() => {
    //
  }, []);

  const onCancelPress = () => {};

  const ProductItem = ({ product }) => {
    //console.log("product item: ", product);
    return (
      <View style={[{ flexDirection: "column" }]}>
        {product.pictures && product.pictures.length > 0 ? (
          <Image
            source={{ uri: product.pictures[0] }}
            style={styles.imagePreview}
          />
        ) : (
          ""
        )}
        <View style={[{ flexDirection: "row" }]}>
          <Text style={styles.title3}>{product.name}</Text>
          <Text>{"   $" + product.price}</Text>
          <Text>{"   units: " + product.quantity}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.content]}>
      <View style={{ flexDirection: "column" }}>
        <Text>
          {" "}
          {" Placed on " + new Date(order.time).toLocaleDateString()}
        </Text>
        <Text> {" Total $" + order.total}</Text>
        <Text> {" status: " + order.status}</Text>
      </View>
      <View
        style={[
          styles.content2,
          { flexDirection: "column", alignItems: "center" },
        ]}
      >
        {order && order.products ? (
          <FlatList
            data={order.products}
            renderItem={({ item }) => <ProductItem product={item} />}
            keyExtractor={(item) => item._id}
          />
        ) : (
          ""
        )}
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          onCancelPress();
        }}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableHighlight>
    </View>
  );
};

//order.products.map((prod) => <Text key={prod._id}>{prod.name}</Text>);

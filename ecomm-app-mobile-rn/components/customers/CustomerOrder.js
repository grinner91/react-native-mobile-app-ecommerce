import { Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Quantity } from "./Quantity";
import { AppContext, ACTIONS } from "../common/app.context.js";

export const CustomerOrder = ({ order }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    //
  }, []);

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
        <Quantity {...{ onQuantityChange }} />

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            onAddCart();
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

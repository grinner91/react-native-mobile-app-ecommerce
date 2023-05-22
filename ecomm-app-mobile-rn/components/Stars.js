import React, { useState } from "react";

import { View, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";

const Stars = ({ rating, total, onSelectStar }) => {
  console.log(
    "rating: ",
    rating,
    ", total: ",
    total,
    ", onSelectStar: ",
    onSelectStar
  );
  if (!total || total <= 0) total = 5;
  total = Math.ceil(total);
  rating = Math.ceil(rating);
  const stars = [...Array(total)];
  const [starColor, seStarColor] = useState("#FFD64C");
  const [startSelectIndex, setStarSelect] = useState(rating);

  return (
    <View style={{ flexDirection: "row", padding: 5 }}>
      {stars.map((_, i) => {
        return (
          <AntDesign
            key={i}
            name="star"
            size={12}
            color={i <= startSelectIndex ? starColor : "grey"}
            onPress={() => {
              if (onSelectStar) {
                setStarSelect(i);
                onSelectStar(i + 1);
              }
            }}
          />
        );
      })}
    </View>
  );
};

export default Stars;

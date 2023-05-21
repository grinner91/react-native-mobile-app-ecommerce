import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export const CustomerProductReview = ({ product }) => {
  //console.log("CustomerProductReview item: ", product);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {}, []);

    const onSaveReview = () => {
      
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="comments"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="rating"
        value={rating}
        onChangeText={(text) => setRating(text)}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          onSaveReview();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
};

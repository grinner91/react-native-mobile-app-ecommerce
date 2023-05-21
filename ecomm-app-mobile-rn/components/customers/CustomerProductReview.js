import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { addProductReview } from "../../services/products.http";

export const CustomerProductReview = ({ product, onReviewSaved }) => {
  //console.log("CustomerProductReview item: ", product);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {}, []);

  const onSaveReviewPress = () => {
    if (comment === "" && rating === "") return;

    const newReview = {
      comment: comment,
      rating: rating,
    };
    addProductReview(product, newReview)
      .then((res) => {
        console.log("addProductReview res: ", res);
        setComment("");
        setRating("");
        onReviewSaved();
      })
      .catch((err) => console.log("addProductReview: ", err));
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
          onSaveReviewPress();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
};

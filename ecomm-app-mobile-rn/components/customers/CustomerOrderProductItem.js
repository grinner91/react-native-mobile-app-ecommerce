import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { CustomerProductReview } from "./CustomerProductReview";

export const CustomerOrderProductItem = ({ product }) => {
  //console.log("product item: ", product);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [isWrittingReview, setIsWrittingReview] = useState(false);

  useEffect(() => {}, []);

  const onShowReviewUI = () => {
    setIsWrittingReview(!isWrittingReview);
  };
  const onReviewSaved = () => {
    setIsWrittingReview(!isWrittingReview);
  };
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
        <TouchableHighlight
          style={styles.reviewButton}
          onPress={() => {
            onShowReviewUI();
          }}
        >
          <Text style={styles.buttonText}>Review</Text>
        </TouchableHighlight>
      </View>
      {isWrittingReview ? (
        <CustomerProductReview
          product={product}
          onReviewSaved={onReviewSaved}
        />
      ) : (
        ""
      )}
    </View>
  );
};

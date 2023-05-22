import { Image, Text, View, TouchableHighlight } from "react-native";
import { styles } from "../../styles/styles";
import { useEffect, useState } from "react";
import { CustomerProductReview } from "./CustomerProductReview";
import Stars from "../Stars";

export const CustomerOrderProductItem = ({ product }) => {
  //console.log("product item: ", product);
  const [isWrittingReview, setIsWrittingReview] = useState(false);

  useEffect(() => {}, []);

  const onShowReviewUI = () => {
    setIsWrittingReview(!isWrittingReview);
  };
  const onReviewSaved = () => {
    setIsWrittingReview(!isWrittingReview);
  };

  const showReviewScoreUI = () => {
    if (product && product.review && product.review.score > 0) {
      return (
        <Stars
          {...{ rating: product.review.score, total: product.review.score }}
        />
      );
    } else return "";
  };
  return (
    <View>
      <View style={[{ flexDirection: "row" }]}>
        <View>
          {product.pictures && product.pictures.length > 0 ? (
            <Image
              source={{ uri: product.pictures[0] }}
              style={styles.imagePreview}
            />
          ) : (
            ""
          )}
        </View>
        <View style={[{ flexDirection: "column", margin: 10 }]}>
          <Text style={styles.title3}>{product.name}</Text>
          <Text>{"price $" + product.price}</Text>
          <Text>{"quantity: " + product.quantity}</Text>
          <Text> stars {showReviewScoreUI()}</Text>
          <TouchableHighlight
            style={styles.reviewButton}
            onPress={() => {
              onShowReviewUI();
            }}
          >
            <Text style={styles.buttonText}>Review</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        {isWrittingReview ? (
          <CustomerProductReview
            product={product}
            onReviewSaved={onReviewSaved}
          />
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

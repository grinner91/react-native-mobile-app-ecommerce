import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { CustomerProductReview } from "./CustomerProductReview";

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

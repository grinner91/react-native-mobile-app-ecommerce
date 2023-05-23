import { Image, Text, View, TextInput, TouchableHighlight } from "react-native";
import { styles } from "../../styles/styles";
import { useEffect, useState } from "react";
import { addProductReview } from "../../services/products.http";
import Stars from "../Stars";

export const CustomerProductReview = ({ product, onReviewSaved }) => {
  //console.log("CustomerProductReview item: ", product);
 
  const [state, setState] = useState({});

  useEffect(() => {
    setState({ comment: "", stars: 0 });
  }, []);

  const onSaveReviewPress = () => {
    if (state.comment === "" && state.stars === 0) return;

    const newReview = {
      comment: state.comment,
      stars: state.stars,
    };
    console.log("CustomerProductReview newReview:  ", newReview);
    addProductReview(product, newReview)
      .then((res) => {
        console.log("CustomerProductReview res: ", res);
        if (res.success) {
          setState((prevState) => ({ ...prevState, comment: "", stars: 0 }));
          onReviewSaved();
        }
      })
      .catch((err) => console.log("CustomerProductReview: ", err));
  };

  const onSelectStar = (star) => {
    console.log("CustomerProductReview onSelectStar: ", star);
    setState((prevState) => ({ ...prevState, stars: star }));
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="comments"
        value={state.comment}
        onChangeText={(text) => {
          setState((prevState) => ({ ...prevState, comment: text }));
        }}
      />

      <Stars {...{ rating: 0, total: 5, onSelectStar: onSelectStar }} />

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

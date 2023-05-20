import { Text, TouchableHighlight, View, SafeAreaView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { AppContext } from "../../common/app.context.js";
import { CartItem } from "./CartItem.js";
import { styles } from "../../styles/styles.js";

export const CartList = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  let [total, setTotal] = useState(0);
  useEffect(() => {
    setCartItems(state.cart);
    //console.log("cartitems: ", typeof state.cart, " , ", cartItems);
    calculateTotal();
  });

  const calculateTotal = () => {
    let sum = 0.0;
    for (let item of cartItems) {
      //console.log("item: ", item);
      sum = sum + parseFloat(item.total);
    }
    setTotal(sum);
  };

  const onCheckout = () => {
    console.log("oncheckout");
    navigation.navigate("CartShippingAddress");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title2}>Shopping Cart </Text>

        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.product._id}
        />
        <View>
          <Text style={styles.input}>{"Total: $" + total}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              onCheckout();
            }}
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

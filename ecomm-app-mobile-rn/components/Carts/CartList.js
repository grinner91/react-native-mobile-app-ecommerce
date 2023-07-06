import {
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ACTIONS, AppContext } from "../../common/app.context.js";
import { CartItem } from "./CartItem.js";
import { styles } from "../../styles/styles.js";

export const CartList = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  let [total, setTotal] = useState(0);
  const [refreshCart, setRefreshCart] = useState(false);

  useEffect(() => {
    setCartItems(state.cart);
    console.log("cartitems: ", typeof state.cart, " , ", cartItems);
    calculateTotal();
  });

  const onRemoveCartItem = (item) => {
    console.log("Remove item : ", item);
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: item,
    });
    setCartItems(state.cart);
    setRefreshCart(!refreshCart);
    //const updatedItems = cartItems.filter( p)
  };

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
    navigation.navigate("CartCheckout");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title2}>Shopping Cart </Text>

        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem item={item} onRemoveCartItem={onRemoveCartItem} />
          )}
          keyExtractor={(item) => item.product._id}
        />
        <View>
          {cartItems && cartItems.length == 0 ? (
            <Text>No item in the cart</Text>
          ) : (
            ""
          )}
          {cartItems && cartItems.length > 0 ? (
            <>
              <Text style={styles.input}>{"Total: $" + total}</Text>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  onCheckout();
                }}
              >
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableHighlight>
            </>
          ) : (
            ""
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

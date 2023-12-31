import {
  Alert,
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { styles } from "../../styles/styles.js";
// import { StripeProvider, CardField } from "@stripe/stripe-react-native";
import {
  CUSTOMERS_PAGE,
  STRIPE_PUBLBISHABLE_KEY,
} from "../../common/constants.js";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { createCustomerOrder } from "../../common/utils.js";
import { retrieveUser } from "../../common/app.localstore.js";
import { ACTIONS, AppContext } from "../../common/app.context.js";
import {
  checkoutOrder,
  checkoutOrderRequest,
} from "../../services/orders.http.js";
import { CardField, StripeProvider } from "@stripe/stripe-react-native";
import { fetchPaymentClientSecret } from "../../services/payment.http.js";

export const CartCheckout = () => {
  const { state, dispatch } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    console.log("CartCheckout state: ", state);

    retrieveUser().then((data) => {
      console.log("CartCheckout user: ", state.user);
      setUser(data);
    });
    setCartItems(state.cart);
  }, []);

  const onPayPress = () => {
    console.log("onPay");
    //TODO
    //1. get client secret
    // fetchPaymentClientSecret().then((res) => {

    // });
    //On pay success place order
    if (user && state.cart) {
      const newOrder = createCustomerOrder(user._id, state.cart);
      console.log("onPayPress newOrder: ", newOrder);
      checkoutOrderRequest(newOrder)
        .then((res) => {
          //console.log("checkoutOrderRequest res: ", res);
          dispatch({ type: ACTIONS.RESET_CART });
          Alert.alert("Your order is placed successfully!");
          navigation.dispatch(StackActions.pop(1));
          navigation.navigate(CUSTOMERS_PAGE.ORDER_LIST);
        })
        .catch((err) => {
          console.log("checkoutOrderRequest err: ", err);
        });
    } else {
      console.log("onPayPress: no state.user, state.cart");
      Alert.alert("Please, login to order");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Checkout</Text>
        <StripeProvider publishableKey={STRIPE_PUBLBISHABLE_KEY}>
          <CardField
            postalCodeEnabled={true}
            autofocus
            style={styles.cardField}
          />
        </StripeProvider>
        <TouchableHighlight
          style={[styles.button, { alignSelf: "stretch" }]}
          onPress={() => {
            onPayPress();
          }}
        >
          <Text style={styles.buttonText}>Pay by Card</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

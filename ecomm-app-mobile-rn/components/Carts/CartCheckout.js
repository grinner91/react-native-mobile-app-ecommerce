import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../../styles/styles.js";
import { StripeProvider, CardField } from "@stripe/stripe-react-native";
import { STRIPE_PUBLBISHABLE_KEY } from "../../common/constants.js";
import { TouchableHighlight } from "react-native-gesture-handler";

export const CartCheckout = () => {
  const onPayPress = () => {
    console.log("onPay");
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
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Pay by Card</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

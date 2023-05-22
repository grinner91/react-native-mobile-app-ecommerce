import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartList } from "./CartList";
import { CartCheckout } from "./CartCheckout";
import { CartShippingAddress } from "./CartShippingAddress";

const Stack = createNativeStackNavigator();

export const CartStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CartList"
        component={CartList}
        //options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="CartCheckout"
        component={CartCheckout}
        //options={{ headerTitle: "Checkout" }}
      />
      <Stack.Screen
        name="CartShippingAddress"
        component={CartShippingAddress}
        //options={{ headerTitle: "Shipping Address" }}
      />
    </Stack.Navigator>
  );
};

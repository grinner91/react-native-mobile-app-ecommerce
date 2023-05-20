import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminUsersList } from "./AdminUsersList";
import { AddEditProduct } from "./AddEditProduct";
import { AdminOrdersList } from "./AdminOrdersList";
import { AdminProductsList } from "./AdminProductsList";
import { AdminOptions } from "./AdminOptions";

const Stack = createNativeStackNavigator();

export const AdminStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminOptions"
        component={AdminOptions}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="AdminUsersList"
        component={AdminUsersList}
        options={{ headerTitle: "Users" }}
      />
      <Stack.Screen
        name="AddEditProduct"
        component={AddEditProduct}
        options={{ headerTitle: "Add/Edit Product" }}
      />
      <Stack.Screen
        name="AdminProductsList"
        component={AdminProductsList}
        options={{ headerTitle: "Products" }}
      />
      <Stack.Screen
        name="AdminOrdersList"
        component={AdminOrdersList}
        options={{ headerTitle: "Orders" }}
      />
    </Stack.Navigator>
  );
};

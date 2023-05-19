import "react-native-gesture-handler";
import React, { useReducer } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { ProductsList } from "./components/ProductsList";
import { AppContext, reducer } from "./services/app.context";
import { CartStackNav } from "./components/Carts/CartStackNav";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    token: null,
    cart: [],
    isloggedin: false,
  });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="products"
            component={ProductsList}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="cart"
            component={CartStackNav}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={30}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

import "react-native-gesture-handler";
import React, { useReducer } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { ProductsList } from "./components/ProductsList";
import { Cart } from "./components/Cart";
import { AppContext, reducer } from "./services/app.context";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <NavigationContainer>
      <AppContext.Provider value={{ state, dispatch }}>
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
            component={Cart}
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
      </AppContext.Provider>
    </NavigationContainer>
  );
}

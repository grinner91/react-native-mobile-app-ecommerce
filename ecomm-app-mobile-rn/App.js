import "react-native-gesture-handler";
import React, { useEffect, useReducer, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import {
  CustomerProductsList,
  ProductsList,
} from "./components/CustomerProductsList.js";
import { ACTIONS, AppContext, reducer } from "./common/app.context.js";
import { CartStackNav } from "./components/Carts/CartStackNav";
import { AdminStackNav } from "./components/admin/AdminStackNav";
import { Profile } from "./components/users/Profile";
import { retrieveState, saveState } from "./common/app.localstore";
import Header from "./components/Header.ios";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    token: null,
    cart: [],
    isLoggedin: false,
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    //saveState({}); //reset data
    retrieveState().then((data) => {
      console.log("App Loading data: ", data);
      if (data.isLoggedin) {
        dispatch({ type: ACTIONS.SIGN_IN, payload: data });
      }
    });
  }, [reload]);

  const onLoggedin = () => {
    console.log("App.js onLoggedin ");
    setReload(!reload);
  };

  const onLogout = () => {
    setReload(!reload);
  };
  return (
    <AppContext.Provider
      value={{ state, dispatch, onLoggedin, onLogout, reload }}
    >
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="CustomerProductsList"
            component={CustomerProductsList}
            options={{
              headerTitle: "Products",
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
          <Tab.Screen
            name="admin"
            component={AdminStackNav}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="database-cog-outline"
                  size={30}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account-details-outline"
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

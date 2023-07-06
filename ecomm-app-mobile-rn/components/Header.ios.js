import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import HeaderStyle from "../styles/HeaderStyle";
import { AppContext } from "../common/app.context";
import { Logout } from "./users/Logout";

const Header = () => {
  const { state, reload } = useContext(AppContext);

  useEffect(() => {}, [reload]);

  return (
    <View style={[HeaderStyle.ios, { flexDirection: "row" }]}>
      <MaterialCommunityIcons name="cart" size={30} />
      <Logout />
    </View>
  );
};

export default Header;

import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import HeaderStyle from "../styles/HeaderStyle";
import { AppContext } from "../common/app.context";
import { retrieveUser } from "../common/app.localstore";

const Header = () => {
  const { state } = useContext(AppContext);
  const [user, setUser] = useState({ fullname: "" });
  useEffect(() => {
    retrieveUser().then((data) => {
      console.log("Header Loading data: ", data);
      if (data) setUser(data);
    });
  }, []);
  return (
    <View style={[HeaderStyle.ios, { flexDirection: "row" }]}>
      {/* <Image style={{ height: 100, width: 100 }} source={} /> */}
      <MaterialCommunityIcons name="cart" size={30} />
      <Text
        style={{
          marginLeft: 20,
          alignItems: "flex-end",
          alignSelf: "flex-end",
        }}
      >
        {user.fullname}
      </Text>
    </View>
  );
};

export default Header;

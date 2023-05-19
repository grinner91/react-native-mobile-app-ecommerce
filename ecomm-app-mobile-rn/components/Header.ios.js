import React from "react";
import { Text, View, Image } from "react-native";

import HeaderStyle from "../styles/HeaderStyle";
import CourseImage from "../images/course.png";

const Header = () => {
  return (
    <View style={HeaderStyle.ios}>
      <Image style={{ height: 100, width: 100 }} source={CourseImage} />
    </View>
  );
};

export default Header;

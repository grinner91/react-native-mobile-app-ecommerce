import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { Login } from "./Login";
import { AUTH_PAGE } from "../../common/constants";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/app.context";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header.ios";

export const Profile = () => {
  const { state, reload } = useContext(AppContext);
  const navigation = useNavigation();
  //
  useEffect(() => {
    console.log(
      "Profile mounting: user ",
      state.user,
      ", isLoggedin: ",
      state.isLoggedin
    );
  });

  const onSignupPress = () => {
    navigation.navigate(AUTH_PAGE.SIGNUP);
  };

  const profileInfoUI = () => {
    console.log("profileInfoUI: ", state.user);
    if (state.user && state.user.fullname) {
      return (
        <View style={[styles.content2]}>
          <Text>Welcome</Text>
          <Text style={styles.title3}>Wellcome {state.user.fullname}</Text>
          <Text> emai: {state.user.email}</Text>
          <Text> role: {state.user.role}</Text>
        </View>
      );
    } else {
      return <Text> No User</Text>;
    }
  };

  const singupActionUI = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <TouchableHighlight
          style={[styles.button]}
          onPress={() => onSignupPress()}
        >
          <Text style={styles.submitButtonText}>Signup</Text>
        </TouchableHighlight>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.content}>
        {profileInfoUI()}
        <Login />
        {singupActionUI()}
        {/* {state.isLoggedin ? profileInfoUI() : <Login />}
        {state.isLoggedin ? "" : singupActionUI()} */}
      </View>
    </SafeAreaView>
  );
};

import { SafeAreaView, Text, View, TouchableHighlight } from "react-native";
import { styles } from "../../styles/styles";
import { Login } from "./Login";
import { AUTH_PAGE } from "../../common/constants";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../common/app.context";
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
        <View>
          <View style={[]}>
            <Text style={styles.title3}>Wellcome {state.user.fullname}</Text>
            <Text> emai: {state.user.email}</Text>
            <Text> role: {state.user.role}</Text>
          </View>
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
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {state.isLoggedin ? profileInfoUI() : <Login />}
        {state.isLoggedin ? "" : singupActionUI()}
      </View>
    </SafeAreaView>
  );
};

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
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  //
  useEffect(() => {
    //if (state.isLoggedin && state.user) {
    setIsLoggedin(state.isLoggedin);
    setUser(state.user);
    //}
  }, [reload]);
  //
  const onSignupPress = () => {
    navigation.navigate(AUTH_PAGE.SIGNUP);
  };

  const profileInfoUI = () => {
    return (
      <View>
        <View style={[styles.content2]}>
          <Text style={styles.title3}>Wellcome {user.fullname}</Text>
          <Text> emai: {user.email}</Text>
          <Text> role: {user.role}</Text>
        </View>
      </View>
    );
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
        {isLoggedin ? profileInfoUI() : <Login />}
        {isLoggedin ? "" : singupActionUI()}
      </View>
    </SafeAreaView>
  );
};

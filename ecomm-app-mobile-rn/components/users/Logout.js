import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Text, TouchableHighlight, View } from "react-native";
import { styles } from "../../styles/styles.js";
import { ACTIONS, AppContext } from "../../common/app.context.js";
import { retrieveUser } from "../../common/app.localstore.js";

export const Logout = () => {
  const navigation = useNavigation();
  const { state, dispatch, onLogout, reload } = useContext(AppContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    retrieveUser().then((data) => {
      console.log("Logout Loading data: ", data);
      setUser(data);
      console.log("Logout state: ", state);
    });
  }, [reload]);

  const onLogoutPress = () => {
    dispatch({ type: ACTIONS.SIGN_OUT, payload: "" });
    onLogout();
    navigation.navigate("ProductsList");
  };

  const userInfoUI = () => {
    return (
      <View style={[{ alignItems: "flex-end", flexDirection: "row" }]}>
        <TouchableHighlight onPress={() => {}}>
          <Text
            style={{
              paddingTop: 10,
              paddingLeft: 10,
              paddingEnd: 10,
              fontWeight: "bold",
            }}
          >
            {user && user.fullname ? user.fullname : ""}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => onLogoutPress()}>
          <MaterialCommunityIcons name="logout" size={20} />
          {/* <Text style={{ paddingLeft: 10 }}>logout</Text> */}
        </TouchableHighlight>
      </View>
    );
  };
  return (
    <View style={[{ alignItems: "flex-end", flexDirection: "row" }]}>
      {user && user.fullname ? userInfoUI() : ""}
    </View>
  );
};

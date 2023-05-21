import { useEffect } from "react";
import { Text, View } from "react-native";
import { updateUserRequest } from "../../services/users.http";
import { TouchableHighlight } from "react-native-gesture-handler";
import { styles } from "../../styles/styles.js";

export const AdminUserItem = ({ user, onUserStatusUpdated }) => {
  //console.log("AdminUserItem user: ", user);

  useEffect(() => {}, []);

  const updateUserStatusPress = (userStatus) => {
    updateUserRequest(user._id, { disable: userStatus })
      .then((res) => {
        console.log("updateUserStatusPress res: ", res);
        onUserStatusUpdated();
      })
      .catch((err) => console.log("updateOrderStatusPress err: ", err));
  };

  const userStatusActionsUI = () => {
    if (user.disable) {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            updateUserStatusPress(false);
          }}
        >
          <Text style={styles.buttonText}>Enable</Text>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            updateUserStatusPress(true);
          }}
        >
          <Text style={styles.buttonText}>Disable</Text>
        </TouchableHighlight>
      );
    }
  };
  return (
    <View style={[styles.content]}>
      <Text style={styles.title3}> {user.fullname}</Text>
      <Text> {user.email}</Text>
      <Text> {user.role}</Text>
      {userStatusActionsUI()}
    </View>
  );
};

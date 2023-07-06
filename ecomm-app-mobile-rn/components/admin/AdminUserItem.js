import { useEffect } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { updateUserRequest } from "../../services/users.http";
import { styles } from "../../styles/styles.js";
import { USER_TYPE } from "../../common/constants";

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

  const updateUserRolePress = (userRole) => {
    updateUserRequest(user._id, { role: userRole })
      .then((res) => {
        console.log("updateUserRolePress res: ", res);
        onUserStatusUpdated();
      })
      .catch((err) => console.log("updateUserRolePress err: ", err));
  };

  const userStatusActionsUI = () => {
    if (user.role === USER_TYPE.ADMIN && user.email.includes(USER_TYPE.ADMIN)) {
      return "";
    }

    if (user.disable) {
      return (
        <TouchableHighlight
          style={[styles.button, styles.adminColor]}
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
          style={[styles.button, styles.adminColor]}
          onPress={() => {
            updateUserStatusPress(true);
          }}
        >
          <Text style={styles.buttonText}>Disable</Text>
        </TouchableHighlight>
      );
    }
  };

  const showUserAdminActionUI = () => {
    if (user.role === USER_TYPE.CUSTOMER) {
      return (
        <TouchableHighlight
          style={[styles.button, styles.adminColor]}
          onPress={() => {
            updateUserRolePress(USER_TYPE.ADMIN);
          }}
        >
          <Text style={styles.buttonText}>Make Admin</Text>
        </TouchableHighlight>
      );
    } else if (
      user.role === USER_TYPE.ADMIN &&
      !user.email.includes(USER_TYPE.ADMIN)
    ) {
      return (
        <TouchableHighlight
          style={[styles.button, styles.adminColor]}
          onPress={() => {
            updateUserRolePress(USER_TYPE.CUSTOMER);
          }}
        >
          <Text style={styles.buttonText}>Make Customer</Text>
        </TouchableHighlight>
      );
    } else return "";
  };
  return (
    <View style={[styles.content, styles.adminColor]}>
      <Text style={styles.title3}> {user.fullname}</Text>
      <Text> {user.email}</Text>
      <Text> {user.role}</Text>
      {userStatusActionsUI()}
      {showUserAdminActionUI()}
    </View>
  );
};

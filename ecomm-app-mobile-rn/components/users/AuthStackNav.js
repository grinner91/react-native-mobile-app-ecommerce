import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AUTH_PAGE } from "../../common/constants";
import { Logout } from "./Logout";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { Login } from "./Login";

const Stack = createNativeStackNavigator();

export const AuthStackNav = () => {
  return (
    <Stack.Navigator initialRouteName={AUTH_PAGE.PROFILE}>
      <Stack.Screen
        name={AUTH_PAGE.PROFILE}
        component={Profile}
        options={{ headerTitle: "Profile" }}
      />
      <Stack.Screen
        name={AUTH_PAGE.LOGIN}
        component={Login}
        options={{ headerTitle: "Login" }}
      />
      <Stack.Screen
        name={AUTH_PAGE.LOGOUT}
        component={Logout}
        options={{ headerTitle: "Logout" }}
      />
      <Stack.Screen
        name={AUTH_PAGE.SIGNUP}
        component={Signup}
        options={{ headerTitle: "Signup" }}
      />
    </Stack.Navigator>
  );
};

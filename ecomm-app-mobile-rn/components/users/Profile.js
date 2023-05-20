import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { Login } from "./Login";

export const Profile = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>User's profile</Text>
        <Login />
      </View>
    </SafeAreaView>
  );
};

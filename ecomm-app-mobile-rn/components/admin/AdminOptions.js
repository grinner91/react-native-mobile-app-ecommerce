import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native"; //"react-native-gesture-handler";

export const AdminOptions = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableHighlight
        style={[styles.button, styles.adminOptions, styles.adminColor]}
        onPress={() => {
          navigation.navigate("AdminUsersList");
        }}
      >
        <Text style={[styles.submitButtonText]}>Users</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, styles.adminOptions, styles.adminColor]}
        onPress={() => {
          navigation.navigate("AdminProductsList");
        }}
      >
        <Text style={[styles.submitButtonText]}>Products</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, styles.adminOptions, styles.adminColor]}
        onPress={() => {
          navigation.navigate("AdminOrdersList");
        }}
      >
        <Text style={styles.submitButtonText}>Orders</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

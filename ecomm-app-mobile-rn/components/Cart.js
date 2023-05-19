import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { styles } from "../styles/styles";

export const Cart = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Cart</Text>
      </View>
    </SafeAreaView>
  );
};

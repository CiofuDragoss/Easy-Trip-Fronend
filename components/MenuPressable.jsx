import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import colors from "@/constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function MenuButton({ onPress = () => {} }) {
  return (
    <Pressable style={styles.ball} onPress={onPress}>
      <MaterialIcons name="account-circle" size={40} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ball: {
    margin: 15,
    borderRadius: 50,

    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
});

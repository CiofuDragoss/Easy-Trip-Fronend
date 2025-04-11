import { useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Animated,
  PanResponder,
} from "react-native";
import colors from "../../constants/colors";
import AnimatedLogo from "@/components/animatedLogo";
import SignLogin from "@/components/SingLogin";
export default function AuthPage() {
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <SignLogin />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});

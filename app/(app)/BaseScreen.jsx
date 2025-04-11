import { View, Text, StyleSheet, Animated } from "react-native";
import colors from "@/constants/colors";
import AnimatedLogo from "@/components/animatedLogo";
export default function BaseRecSettings() {
  return (
    <View style={styles.container}>
      <Text>base rec settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
});

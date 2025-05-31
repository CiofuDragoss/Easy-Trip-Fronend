import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Gradient from "./Gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolateColor,
} from "react-native-reanimated";
const AnimatedAnt = Animated.createAnimatedComponent(AntDesign);

export default function CleanButton({ onPress, style, text }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 6000 }), -1, true);
  }, []);

  const animatedG = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ["#007BFF", "#1f2c4d"]),
  }));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrapper,
        style,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <Gradient style={styles.button} color={"white"} x={0.9}>
        <AnimatedAnt name="google" size={17} style={animatedG} />
        <Animated.Text style={[styles.text, animatedG]}>{text}</Animated.Text>
      </Gradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  text: {
    fontSize: 11,
    color: "black",

    fontFamily: "Poppins-Bold",
  },

  button: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 30,
    alignItems: "baseline",
  },
});

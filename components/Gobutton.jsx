import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
  Extrapolation,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const BUTTON_WIDTH = 80;
const CONT_W = 230;

export default function GoButton({ text, onSwipe }) {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.min(
        Math.max(event.translationX, 0),
        CONT_W - BUTTON_WIDTH
      );
    })
    .onEnd((event) => {
      if (event.translationX > (CONT_W - BUTTON_WIDTH) * 0.9) {
        runOnJS(onSwipe)();
      }

      translateX.value = withSpring(0, { overshootClamping: true });
    });

  const fillStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, CONT_W - BUTTON_WIDTH],
      [1, CONT_W / (BUTTON_WIDTH - 15)],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        { translateX: -(BUTTON_WIDTH - 30) / 2 },
        { scaleX: scale },
        { translateX: (BUTTON_WIDTH - 30) / 2 },
      ],
    };
  });

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, CONT_W - BUTTON_WIDTH],
      [1, 1.3],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      [0, CONT_W - BUTTON_WIDTH],
      [0.8, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.sliderContainer}>
      <Animated.View style={[styles.fill, fillStyle]} />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.goButton, buttonStyle]}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Animated.Text style={[styles.goText, textStyle]}>
            {" "}
            {text}{" "}
          </Animated.Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: CONT_W,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 40,
  },
  goButton: {
    width: BUTTON_WIDTH,
    height: "100%",
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  goText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: BUTTON_WIDTH - 30,
    backgroundColor: "#007BFF",
  },
});

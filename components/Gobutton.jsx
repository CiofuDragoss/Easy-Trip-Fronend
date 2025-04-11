import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, PanResponder, View } from "react-native";

const BUTTON_WIDTH = 80;
const CONT_W = 230;

export default function GoButton({ text, onSwipe }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const fillScaleX = translateX.interpolate({
    inputRange: [0, CONT_W - BUTTON_WIDTH],
    outputRange: [1, CONT_W / (BUTTON_WIDTH - 15)],
    extrapolate: "clamp",
  });

  const textScale = translateX.interpolate({
    inputRange: [0, CONT_W - BUTTON_WIDTH],
    outputRange: [1, 17 / 13],
    extrapolate: "clamp",
  });

  const textOpacity = translateX.interpolate({
    inputRange: [0, CONT_W - BUTTON_WIDTH],
    outputRange: [0.4, 0.7],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newX = Math.min(
          Math.max(gestureState.dx, 0),
          CONT_W - BUTTON_WIDTH
        );
        console.log(newX);
        translateX.setValue(newX);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > CONT_W * 0.9) {
          onSwipe?.();
        }
        Animated.spring(translateX, {
          toValue: 0,
          friction: 3,
          useNativeDriver: true,
          overshootClamping: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.sliderContainer}>
      <Animated.View
        style={[
          styles.fill,
          {
            transform: [
              { translateX: -(BUTTON_WIDTH - 30) / 2 },
              { scaleX: fillScaleX },
              { translateX: (BUTTON_WIDTH - 30) / 2 },
            ],
          },
        ]}
      />
      <Animated.View
        style={[styles.goButton, { transform: [{ translateX: translateX }] }]}
        hitSlop={{ top: 100, bottom: 100, left: 100, right: 200 }}
        {...panResponder.panHandlers}
      >
        <Animated.Text
          style={[
            styles.goText,
            {
              opacity: textOpacity,
              transform: [{ scale: textScale }],
              pointerEvents: "none",
            },
          ]}
        >
          {text}
        </Animated.Text>
      </Animated.View>
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
    marginTop: 20,
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
    fontSize: 13,
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

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Fontisto from "@expo/vector-icons/Fontisto";

const ICON_SIZE = 32;
const SPEED = 2; // pixels per frame

export default function AnimatedPlaneContainer() {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  return (
    <GestureHandlerRootView style={styles.full}>
      <View
        style={styles.full}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setLayout({ width, height });
        }}
      >
        {layout.width > 0 && layout.height > 0 && (
          <AnimatedPlane width={layout.width} height={layout.height} />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

function AnimatedPlane({ width, height }) {
  const x = useSharedValue(width / 2 - ICON_SIZE / 2);
  const y = useSharedValue(height / 2 - ICON_SIZE / 2);
  const angle = useSharedValue(Math.random() * 2 * Math.PI);

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      function animate() {
        // Move based on current angle
        x.value += Math.cos(angle.value) * SPEED;
        y.value += Math.sin(angle.value) * SPEED;

        let collided = false;
        let newAngle = angle.value;

        // Horizontal collision
        if (x.value <= 0) {
          // Reflect horizontal component and nudge inside
          newAngle = Math.PI - angle.value;
          x.value = 1;
          collided = true;
        } else if (x.value >= width - ICON_SIZE) {
          newAngle = Math.PI - angle.value;
          x.value = width - ICON_SIZE - 1;
          collided = true;
        }

        // Vertical collision
        if (y.value <= 0) {
          newAngle = -angle.value;
          y.value = 1;
          collided = true;
        } else if (y.value >= height - ICON_SIZE) {
          newAngle = -angle.value;
          y.value = height - ICON_SIZE - 1;
          collided = true;
        }

        // Smoothly rotate angle once per collision
        if (collided) {
          angle.value = withTiming(newAngle, { duration: 300 });
        }

        requestAnimationFrame(animate);
      }
      animate();
    })();
  }, [width, height]);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    transform: [{ rotateZ: `${angle.value}rad` }],
  }));

  // Tap to reverse direction smoothly
  const tap = Gesture.Tap().onEnd(() => {
    "worklet";
    const target = angle.value + Math.PI;
    angle.value = withTiming(target, { duration: 300 });
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={style}>
        <Fontisto name="plane" size={ICON_SIZE} color="#007BFF" />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});

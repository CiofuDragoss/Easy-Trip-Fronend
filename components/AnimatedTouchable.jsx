import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, Pressable } from "react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const AuthSwitcher = ({ onToggle, selected }) => {
  const selectedAnim = useRef(new Animated.Value(selected ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(selectedAnim, {
      toValue: selected ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [selected, selectedAnim]);

  const animateSelection = (selectLogin) => {
    Animated.timing(selectedAnim, {
      toValue: selectLogin ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      if (onToggle) {
        onToggle(selectLogin);
      }
    });
  };

  const leftBackgroundColor = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#007BFF", "#3395FF"],
  });
  const leftOpacity = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });
  const leftTextColor = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#d9d7d7"],
  });
  const rightBackgroundColor = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#3395FF", "#007BFF"],
  });
  const rightOpacity = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const rightTextColor = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#d9d7d7", "white"],
  });

  return (
    <View style={styles.container}>
      <AnimatedTouchable
        style={[
          styles.touchable,
          styles.left,
          { backgroundColor: leftBackgroundColor, opacity: leftOpacity },
        ]}
        onPress={() => animateSelection(true)}
      >
        <Animated.Text style={[styles.text, { color: leftTextColor }]}>
          Log In
        </Animated.Text>
      </AnimatedTouchable>

      <AnimatedTouchable
        style={[
          styles.touchable,
          styles.right,
          { backgroundColor: rightBackgroundColor, opacity: rightOpacity },
        ]}
        onPress={() => animateSelection(false)}
      >
        <Animated.Text style={[styles.text, { color: rightTextColor }]}>
          Sign up
        </Animated.Text>
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  touchable: {
    width: "50%",
    alignItems: "center",
  },
  left: {
    borderTopLeftRadius: 10,
  },
  right: {
    borderTopRightRadius: 10,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
});

export default AuthSwitcher;

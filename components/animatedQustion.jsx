import { useEffect, useRef } from "react";
import { Animated, View, Text, Pressable, StyleSheet } from "react-native";

export default function AnimatedQuestion({ text, repeat }) {
  const translateY = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: -10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Pressable onPress={repeat ? startAnimation : null}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <Text
          style={[
            styles.textt,
            {
              paddingLeft: repeat ? 30 : 5,
              paddingRight: repeat ? 30 : 5,
              fontSize: repeat ? 30 : 20,
            },
          ]}
        >
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  textt: {
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
});

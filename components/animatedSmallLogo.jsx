import React, { useRef, useEffect } from "react";
import { Animated, Text, StyleSheet, Pressable } from "react-native";
import colors from "../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AnimatedLogo({ style }) {
  const translateY = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: -10,
        duration: 200,
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

  const styles = StyleSheet.create({
    logo: {
      color: colors.logo,
      fontFamily: "Poppins-Bold",
      fontSize: 55,
      lineHeight: 63,
    },
    plane: {
      marginLeft: "0.01%",
      marginBottom: "14%",
    },
    logoContainer: {
      position: "relative",
      flexDirection: "row",

      alignItems: "center",
    },
  });

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View
        style={[
          styles.logoContainer,
          style,
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <Text style={styles.logo}>EasyTrip</Text>
        <FontAwesome
          name="plane"
          size={20}
          color={colors.logo_icon}
          style={styles.plane}
        />
      </Animated.View>
    </Pressable>
  );
}

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackgroundBox({ children, color, style, x }) {
  return (
    <LinearGradient
      colors={["transparent", color]}
      start={{ x: 0, y: 0 }}
      end={{ x: x, y: 0 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}

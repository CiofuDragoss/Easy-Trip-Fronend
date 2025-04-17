import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function Press({ text, callback }) {
  const [border, setBorder] = useState(false);

  return (
    <Pressable
      style={[
        styles.button,
        border ? { borderColor: "gold" } : { borderColor: "gray" },
      ]}
      onPress={() => {
        callback();
        setBorder(!border);
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function Press({
  labels = [],
  oneOption = false,
  WIDTH = "60%",
  callback,
}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const onPressLabel = (label) => {
    let updated;
    if (oneOption) {
      updated = [label];
    } else {
      if (selectedItems.includes(label)) {
        updated = selectedItems.filter((l) => l !== label);
      } else {
        updated = [...selectedItems, label];
      }
    }
    setSelectedItems(updated);
    callback?.(updated);
  };

  return (
    <View style={[styles.container, { width: WIDTH }]}>
      {labels.map((label, index) => {
        const isSelected = selectedItems.includes(label);
        return (
          <Pressable
            key={index}
            style={[
              styles.button,
              isSelected ? { borderColor: "gold" } : { borderColor: "gray" },
            ]}
            onPress={() => onPressLabel(label)}
          >
            <Text style={styles.text}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    flexWrap: "wrap",
  },
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

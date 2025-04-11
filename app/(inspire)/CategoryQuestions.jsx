import { Text, View, StyleSheet } from "react-native";
import {
  Animated,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
export default function CategoryQuestions() {
  const trackWidth = 300;
  const thumbSize = 30;

  const translateX = useSharedValue(0);

  const pangesture = Gesture.Pan().onUpdate((e) => {
    let newX = translateX.value + e.changeX;
    newX = Math.max(0, Math.min(newX, trackWidth - thumbSize));
    translateX.value = newX;
  });
  return <View style={styles.main}></View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "green",
  },
});

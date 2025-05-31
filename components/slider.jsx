import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Text, View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width / 2;
const HANDLE_SIZE = 30;

export default function Slider({ labels, text, callback }) {
  const translateX = useSharedValue(-HANDLE_SIZE / 2);
  const startX = useSharedValue(0);
  const sliderValue = useDerivedValue(() => {
    const min = -HANDLE_SIZE / 2;
    const max = SLIDER_WIDTH - HANDLE_SIZE / 2;
    return (translateX.value - min) / (max - min);
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = Math.min(
        Math.max(startX.value + event.translationX, -HANDLE_SIZE / 2),
        SLIDER_WIDTH - HANDLE_SIZE / 2
      );
    })
    .onEnd(() => {
      if (callback) runOnJS(callback)(sliderValue.value);

      translateX.value = withSpring(translateX.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const colorStyle = useAnimatedStyle(() => ({
    width: translateX.value + HANDLE_SIZE / 2,
  }));

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.softTextView}>
          <Text style={styles.softText}>{text}</Text>
        </View>

        <View style={styles.track}>
          <Animated.View style={[styles.filledTrack, colorStyle]} />
        </View>

        <GestureDetector gesture={panGesture}>
          <View style={styles.gestureWrapper}>
            <Animated.View
              style={[styles.handle, animatedStyle]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </View>
        </GestureDetector>
      </View>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <View key={index} style={styles.markers}>
            <View style={styles.bar} />
            <Text style={styles.labelTxt}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gestureWrapper: {
    // suficient spațiu ca handle-ul să intre complet
    position: "absolute",
    top: -60,

    height: 90,
    width: SLIDER_WIDTH + 150,
    left: -75,
    justifyContent: "center",

    // asigură-te că nu ai overflow: 'hidden' aici
  },

  main: {
    alignItems: "center",
    marginTop: 44,
  },
  softTextView: {
    position: "absolute",
    top: -16,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  softText: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    color: "grey",
  },
  labelTxt: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: "black",
    position: "absolute",
    top: 14,
    textAlign: "center",
    width: 100,
    lineHeight: 16,
  },
  markers: {
    alignItems: "center",
    position: "relative",
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SLIDER_WIDTH - 1,
    marginTop: 3,
  },
  bar: {
    borderRadius: 10,
    height: 11,
    width: 2,
    backgroundColor: "black",
  },
  container: {
    position: "relative",
    justifyContent: "center",
  },
  filledTrack: {
    height: "30%",
    backgroundColor: "#3498db",
  },
  track: {
    justifyContent: "center",
    width: SLIDER_WIDTH,
    height: 5,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
  handle: {
    position: "absolute",
    left: 75,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: 20,
    backgroundColor: "#3498db",
  },
});

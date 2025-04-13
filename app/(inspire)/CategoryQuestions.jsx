import { Text, View, StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BaseQuestions from "@/components/BaseQuestions";
export default function CategoryQuestions() {





  return (<View style={styles.main}>
    <BaseQuestions />
    <Slider labels={["$","$$","$$$"]}/>
    
  </View>);
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
});

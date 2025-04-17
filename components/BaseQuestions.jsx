import { Text, View, StyleSheet } from "react-native";
import Slider from "./slider";
import BorderButton from "./borderPressable";
export default function BaseQuestions() {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Care este bugetul tau?</Text>
      <Slider labels={["$", "$$", "$$$"]} />
      <Text style={[styles.text, { marginTop: 35 }]}>
        Ai nevoie de acces pentru scaunul cu rotile?
      </Text>
      <BorderButton text={"Da"} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    textAlign: "center",
  },
});

import { Text, View, StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButton from "@/components/borderPressable";
import BaseQuestions from "@/components/BaseQuestions";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function ExperiencesQuestions() {
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.line} />
      <Text style={styles.text}>Preferati un anumit tip de bucatarie?</Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Italiana"} />
        <BorderButton text={"Chinezeasca"} />
        <BorderButton text={"Mexicana"} />
        <BorderButton text={"Indiana"} />
        <BorderButton text={"Mediteraneana"} />
        <BorderButton text={"Locala & Traditionala"} />
        <BorderButton text={"Franceza"} />
        <BorderButton text={"Thailandeza"} />
        <BorderButton text={"Japoneza"} />
      </View>
      <GoButton text={"continua"} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "gray",
    width: "30%",
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    marginVertical: 2,
  },
  info: {
    width: "70%",
    height: "22%",
    borderRadius: 20,
    backgroundColor: "#4dc2c2",
    padding: 10,
    alignItems: "center",
  },
  infoText: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    flexWrap: "wrap",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 15,
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    textAlign: "center",
  },
});

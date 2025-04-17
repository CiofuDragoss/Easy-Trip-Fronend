import { Text, View, StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButton from "@/components/borderPressable";
import BaseQuestions from "@/components/BaseQuestions";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function NightLifeQuestions() {
  return (
    <View style={styles.main}>
      <AnimatedLogo />

      <View style={styles.line} />

      <Text style={styles.text}>
        Doresti o atmosfera linistita sau muzica la maxim si vibe de party?
      </Text>
      <Slider labels={["linistita", "nebunie"]} />
      <Text style={[styles.text, { marginTop: 35 }]}>
        Preferi anumite tipuri de locatii?
      </Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Karaoke"} />
        <BorderButton text={"Pub"} />
        <BorderButton text={"Lounge"} />
        <BorderButton text={"Bar"} />
        <BorderButton text={"Rooftop Bar"} />
        <BorderButton text={"Club de Noapte"} />

        <BorderButton text={"Nu conteaza"} />
      </View>
      <Text style={styles.text}>Ce tip de muzica preferi?</Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Rock"} />
        <BorderButton text={"Jazz"} />
        <BorderButton text={"pop"} />
        <BorderButton text={"Electronica"} />
        <BorderButton text={"Rap & Trap"} />

        <BorderButton text={"Nu conteaza"} />
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

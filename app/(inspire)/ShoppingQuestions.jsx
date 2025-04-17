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
      <View style={styles.info}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.line} />
        <Text style={styles.infoText}>
          {" "}
          De la malluri comerciale la piete si magazine locale.
        </Text>
      </View>
      <Text style={styles.text}>
        Cat de mult te atrag magazinele sau centrele comerciale mari cu branduri
        renumite fata de cele magazine cu produse locale si autentice?
      </Text>
      <Slider labels={["autentic", "global"]} />

      <Text style={[styles.text, { marginTop: 35 }]}>
        Ce tip de experienta de shopping cauti?
      </Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Moda și accesorii"} />
        <BorderButton text={"Produse locale"} />
        <BorderButton text={"Cosmetice si parfumuri"} />
        <BorderButton text={"Bijuterii"} />
        <BorderButton text={"Souveniruri & Cadouri"} />

        <BorderButton text={"Antichitati & obiecte Artizanale"} />
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

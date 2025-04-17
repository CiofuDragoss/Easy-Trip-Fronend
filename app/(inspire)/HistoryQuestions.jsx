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
          Completeaza cu atentie criteriile si vom cauta cele mai potrivite
          experiente culturale.
        </Text>
      </View>
      <Text style={styles.text}>
        Ce tip de experienta culturala te atrage cel mai mult?
      </Text>
      <Slider labels={["Istorica & Arhitecturala", "Artistică & vizuală"]} />
      <Text style={[styles.text, { marginTop: 55 }]}>
        Ce tip de arta preferi?
      </Text>
      <Slider labels={["Populara", "Clasica", "Moderna"]} />
      <Text style={[styles.text, { marginTop: 55 }]}>
        Ce te atrage în special?
      </Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Muzee"} />
        <BorderButton text={"Expozitii"} />
        <BorderButton text={"Galerii de arta"} />
        <BorderButton text={"Monumente"} />
        <BorderButton text={"Arhitectura"} />

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
    height: "16%",
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
    lineHeight: 20,
  },
});

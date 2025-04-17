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
          Activitati specifice locului, spre exemplu drumetii daca va aflati la
          munte, dar si activitati inedite precum o vizita la Zoo sau Circ,
          tinand cont de criterii.
        </Text>
      </View>
      <Text style={styles.text}>Activitati pline de adrenalina?</Text>
      <View style={styles.row}>
        <BorderButton text={"da"} />
        <BorderButton text={"nu"} />
        <BorderButton text={"ambele"} />
      </View>
      <Text style={styles.text}>
        Experiente solicitante fizic sau relaxante?
      </Text>
      <Slider labels={["usor", "fizic"]} />
      <Text style={[styles.text, { marginTop: 35 }]}>Indoor sau outdoor?</Text>
      <View style={[styles.row, { width: "70%" }]}>
        <BorderButton text={"indoor"} />
        <BorderButton text={"outdoor"} />
        <BorderButton text={"ambele"} />
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
    justifyContent: "space-between",
    width: "60%",
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

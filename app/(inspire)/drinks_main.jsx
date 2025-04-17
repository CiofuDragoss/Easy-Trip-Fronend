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

      <Text style={styles.text}>Sunteti in grup?</Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"solo"} />
        <BorderButton text={"cuplu"} />
        <BorderButton text={"grup"} />
      </View>

      <Text style={styles.text}>Ce bauturi doresti să savurezi?</Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Cafea"} />
        <BorderButton text={"Bere"} />
        <BorderButton text={"Vin"} />
        <BorderButton text={"Cocktailuri"} />
        <BorderButton text={"Ceai"} />
        <BorderButton text={"Smoothies"} />
        <BorderButton text={"Sucuri de fructe"} />
      </View>
      <Text style={styles.text}>Preferi anumite tipuri de locatii?</Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Cafenea"} />
        <BorderButton text={"Bar"} />
        <BorderButton text={"Ceainarie"} />
        <BorderButton text={"Pub"} />
        <BorderButton text={"Lounge"} />
        <BorderButton text={"Smoothies bar"} />
      </View>
      <Text style={styles.text}>
        Ce caracteristici ai dori sa aiba locatiile?
      </Text>
      <View style={[styles.row, { width: "90%" }]}>
        <BorderButton text={"Cozy"} />
        <BorderButton text={"Vegan"} />
        <BorderButton text={"Sanatos"} />
        <BorderButton text={"Traditional"} />
        <BorderButton text={"Modern"} />
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

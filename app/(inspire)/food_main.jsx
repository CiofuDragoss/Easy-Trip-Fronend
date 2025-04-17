import { Text, View, StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButton from "@/components/borderPressable";
import BaseQuestions from "@/components/BaseQuestions";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

export default function ExperiencesQuestions() {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <AnimatedLogo />

      <View style={styles.line} />

      <Text style={styles.text}>Ce masa doriti sa luati?</Text>
      <Slider labels={["Mic-dejun", "Pranz", "Cina"]} />

      <Text style={[styles.text, { marginTop: 35 }]}>
        Fast food sau locatii sit-down?
      </Text>
      <Slider labels={["Fast-Food", "Sit-down", "Premium"]} />
      <Text style={[styles.text, { marginTop: 35 }]}>
        Optiunile vegane sunt importante?
      </Text>
      <BorderButton text={"Da"} />
      <Text style={styles.text}>Ce tip de ambianta preferi la restaurant?</Text>
      <Slider labels={["casual", "sofisticata"]} />
      <Text style={[styles.text, { marginTop: 35 }]}>
        Ce tip de bucatarie preferi?
      </Text>

      <GoButton
        text={"continua"}
        onSwipe={() => navigation.navigate("food_sec")}
      />
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

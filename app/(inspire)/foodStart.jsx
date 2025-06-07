import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";

import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ExperiencesQuestions() {
  const navigation = useNavigation();
  const [option, setOption] = useState("Mancare");

  const handleOptionChange = (label) => {
    setOption(label[0]);
  };

  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.info}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.line} />
        <Text style={styles.infoText}>
          {" "}
          Cafenele, Ceainarii, Baruri , Restaurante , de la Fast-Food la Fine
          Dining. Totul depinde de criteriile introduse.
        </Text>
      </View>
      <BorderButtonList
        labels={["Mancare", "Bauturi & Deserturi"]}
        WIDTH={"80%"}
        oneOption={true}
        callback={handleOptionChange}
      />
      <GoButton
        key={option}
        text={"continua"}
        onSwipe={() =>
          option === "Mancare"
            ? navigation.navigate(option)
            : navigation.navigate("Bauturi")
        }
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
    margin: 20,
    width: "70%",
    height: "19%",
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

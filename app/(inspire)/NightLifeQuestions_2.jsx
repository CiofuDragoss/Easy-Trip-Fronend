import { Text, View, StyleSheet } from "react-native";
import { useContext, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
export default function NightLifeQuestions() {
  const { setSecondaryQuestions } = useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const NightLifeQuestions = useRef({
    atmosphere: 0,
    locationTypes: null,
  });
  const navigation = useNavigation();
  const handleContinue = () => {
    const allAnswers = Object.values(NightLifeQuestions.current).every(
      (item) => {
        if (Array.isArray(item)) {
          return item.length > 0;
        } else if (item === 0) {
          return true;
        }
        return Boolean(item);
      }
    );
    if (!allAnswers) {
      setError(true);
      return;
    }
    setError(false);
    setSecondaryQuestions((prev) => ({
      ...prev,
      ...NightLifeQuestions.current,
    }));
    navigation.replace("Results");
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />

      <View style={styles.line} />

      <Text style={styles.text}>
        Doresti o atmosfera linistita sau muzica la maxim si vibe de party?
      </Text>
      <Slider
        labels={["linistita", "muzica pana dimineata"]}
        callback={(value) => {
          NightLifeQuestions.current.atmosphere = value;
        }}
      />
      <Text style={[styles.text, { margin: 0, marginTop: 45 }]}>
        Preferi anumite tipuri de locatii?
      </Text>
      <Text
        style={[
          styles.text,
          { margin: 0, marginBottom: 10, fontSize: 14, color: "grey" },
        ]}
      >
        Sfat: Selecteaza locatii relevante pentru tipul de atmosfera pe care o
        doresti.
      </Text>
      <BorderButtonList
        labels={["Karaoke", "Pub", "Lounge", "Bar de noapte", "Club de Noapte"]}
        WIDTH={"90%"}
        callback={(labels) => {
          NightLifeQuestions.current.locationTypes = labels;
        }}
      />

      <GoButton text={"continua"} onSwipe={handleContinue} />

      {error ? (
        <Text style={[styles.infoText, { color: "red", marginTop: 20 }]}>
          Asigura-te ca ai completat tot!
        </Text>
      ) : (
        <Text style={styles.infoText}>{""}</Text>
      )}
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

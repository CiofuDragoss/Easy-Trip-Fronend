import { Text, View, StyleSheet } from "react-native";
import { useContext, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function NightLifeQuestions() {
  const { setNightLifeQuestions } = useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const NightLifeQuestions = useRef({
    atmosphere: 0,
    locationTypes: null,
    musicTypes: null,
  });

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
    setNightLifeQuestions((prev) => ({
      ...prev,
      ...NightLifeQuestions.current,
    }));
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />

      <View style={styles.line} />

      <Text style={styles.text}>
        Doresti o atmosfera linistita sau muzica la maxim si vibe de party?
      </Text>
      <Slider
        labels={["linistita", "nebunie"]}
        callback={(value) => {
          NightLifeQuestions.current.atmosphere = value;
        }}
      />
      <Text style={[styles.text, { marginTop: 35 }]}>
        Preferi anumite tipuri de locatii?
      </Text>
      <BorderButtonList
        labels={[
          "Karaoke",
          "Pub",
          "Lounge",
          "Bar",
          "Rooftop Bar",
          "Club de Noapte",
          "Nu conteaza",
        ]}
        WIDTH={"90%"}
        callback={(labels) => {
          NightLifeQuestions.current.locationTypes = labels;
        }}
      />
      <Text style={styles.text}>Ce tip de muzica preferi?</Text>
      <BorderButtonList
        labels={[
          "Rock",
          "Jazz",
          "pop",
          "Electronica",
          "Rap & Trap",
          "Nu conteaza",
        ]}
        WIDTH={"90%"}
        callback={(labels) => {
          NightLifeQuestions.current.musicTypes = labels;
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

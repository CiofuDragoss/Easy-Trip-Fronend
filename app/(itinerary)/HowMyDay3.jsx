import { Text, View, StyleSheet } from "react-native";
import { useContext, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocation } from "@/context/LocationContext";
import { useNavigation } from "expo-router";
export default function SecondaryQuestionsItinerary() {
  const { location } = useLocation();
  const { setSecondaryQuestions } = useContext(QuestionsContext);
  const [error, setError] = useState(false);

  const ItineraryQuestions = useRef({
    foodTypes: [],
    endDayType: [],
  });
  const navigation = useNavigation();
  const handleContinue = () => {
    const allAnswers = Object.values(ItineraryQuestions.current).every(
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
      ...ItineraryQuestions.current,
    }));
    console.log("astea sunt sec questions: ", ItineraryQuestions.current);
    navigation.replace("Results");
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <Text style={[styles.text, { margin: 0, marginTop: 10, fontSize: 22 }]}>
        Ce bucatarie preferati pentru restaurante?
      </Text>
      <View style={[styles.line, { borderBottomWidth: 2, marginBottom: 20 }]} />
      <BorderButtonList
        labels={[
          "Asiatica",
          "Japoneza",
          "Franceza",
          "Mexicana",
          "Tailandeza",
          "Indoneziana",
          "Indiana",
          "Mediteraneana",
          "Africana",
          "Locala & Traditionala",
          "Turceasca",
          "Americana",
          "din Orientul Mijlociu",
          "Italiana",
          "Surprinde-ma",
        ]}
        WIDTH={"90%"}
        callback={(labels) => {
          ItineraryQuestions.current.foodTypes = labels;
        }}
      />
      <Text style={[styles.text, { margin: 0, marginTop: 10, fontSize: 22 }]}>
        Cum doriti sa se incheie ziua?
      </Text>
      <View style={[styles.line, { borderBottomWidth: 2, marginBottom: 20 }]} />
      <BorderButtonList
        labels={["Muzica si distractie", "Activitate relaxanta"]}
        oneOption={true}
        WIDTH={"90%"}
        callback={(labels) => {
          ItineraryQuestions.current.endDayType = labels[0];
        }}
      />

      <View style={[styles.line, { borderBottomWidth: 2, marginTop: 20 }]} />
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
  info: {
    width: "70%",
    height: "22%",
    borderRadius: 20,
    backgroundColor: "#4dc2c2",
    padding: 10,
    alignItems: "center",
  },
  line: {
    borderBottomColor: "gray",
    width: "30%",
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    marginVertical: 2,
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

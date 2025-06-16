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
import SwipeList from "@/components/flatListValue";
const weekDaysGoogle = [
  { key: "1", value: "Lu." },
  { key: "2", value: "Ma." },
  { key: "3", value: "Mie." },
  { key: "4", value: "Joi" },
  { key: "5", value: "Vi." },
  { key: "6", value: "Sa." },
  { key: "0", value: "Du." },
];

export default function MainQuestionsItinerary() {
  const { location } = useLocation();
  const { setMainQuestions, setSecondaryQuestions } =
    useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const budgetRef = useRef(0);
  const ItineraryQuestions = useRef({
    day: 4,
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
    setMainQuestions({
      region: location,
      category: "itinerary",
      distance: 1,
      budget: budgetRef.current,
    });
    console.log("astea sunt main questions: ", location, budgetRef.current);
    setSecondaryQuestions(ItineraryQuestions.current);
    console.log("astea sunt sec questions: ", ItineraryQuestions.current);
    navigation.navigate("SecondaryQuestions");
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />

      <View style={styles.info}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.line} />
        <Text style={styles.infoText}>
          {" "}
          Vom gasi cel mai bun program pentru dumneavoastra in functie de
          raspunsurile la intrebari.
        </Text>
      </View>
      <Text style={styles.text}>Care este bugetul tau?</Text>
      <Slider
        labels={["$", "$$", "$$$"]}
        callback={(value) => (budgetRef.current = value)}
      />

      <Text style={[styles.text, { margin: 0, marginTop: 45 }]}>
        Pentru ce zi doriti itinerariul?
      </Text>
      <SwipeList
        data={weekDaysGoogle}
        onSelectItem={(index) => {
          const googleDay = parseInt(weekDaysGoogle[index].key);
          ItineraryQuestions.current.day = googleDay;
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
    marginTop: 10,
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

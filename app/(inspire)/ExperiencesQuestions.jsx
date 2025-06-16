import { Text, View, StyleSheet } from "react-native";
import { useContext, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import NightLifeQuestions from "./NightLifeQuestions_1";
import { useNavigation } from "expo-router";
export default function ExperiencesQuestions() {
  const { setSecondaryQuestions } = useContext(QuestionsContext);
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const ExperienceQuestions = useRef({
    physical: 0,
    indoorOutdoor: null,
  });

  const handleContinue = () => {
    const allAnswers = Object.values(ExperienceQuestions.current).every(
      (item) => {
        if (item === 0) return true;
        else return Boolean(item);
      }
    );
    if (!allAnswers) {
      setError(true);
      return;
    }
    setError(false);
    setSecondaryQuestions(ExperienceQuestions.current);
    navigation.replace("Results");
  };
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

      <Text style={styles.text}>
        Experiente solicitante fizic sau relaxante?
      </Text>
      <Slider
        labels={["usor", "fizic"]}
        callback={(value) => (ExperienceQuestions.current.physical = value)}
      />
      <Text style={[styles.text, { marginTop: 35 }]}>Indoor sau outdoor?</Text>
      <BorderButtonList
        labels={["indoor", "outdoor", "ambele"]}
        WIDTH={"70%"}
        oneOption={true}
        callback={(labels) => {
          ExperienceQuestions.current.indoorOutdoor = labels[0];
        }}
      />
      <GoButton text={"continua"} onSwipe={handleContinue} />
      {error ? (
        <Text style={{ color: "red", marginTop: 20 }}>
          Asigura-te ca ai selectat tot!
        </Text>
      ) : (
        <Text style={{ color: "red", marginTop: 20 }}>{""}</Text>
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

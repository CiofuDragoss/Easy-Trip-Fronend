import { Text, View, StyleSheet } from "react-native";
import { useRef, useContext, useState } from "react";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { QuestionsContext } from "@/context/QuestionsContext";
import { useNavigation } from "expo-router";

export default function HistoryQuestions() {
  const navigation = useNavigation();
  const { setSecondaryQuestions, MainQuestions } = useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const historyQuestions = useRef({
    experienceType: 0,
    artType: 0,
    locationTypes: null,
  });

  const handleContinue = () => {
    const allAnswers = Object.values(historyQuestions.current).every((item) => {
      if (item === 0) return true;
      else if (Array.isArray(item)) {
        console.log("item", item.length);
        return item.length > 0;
      } else {
        return Boolean(item);
      }
    });
    if (!allAnswers) {
      setError(true);
      return;
    }
    setError(false);
    setSecondaryQuestions(historyQuestions.current);
    navigation.replace("Results");
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.info}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.line} />
        <Text style={styles.infoText}>
          Completeaza cu atentie criteriile si vom cauta cele mai potrivite
          experiente culturale.
        </Text>
      </View>
      <Text style={styles.text}>
        Ce tip de experienta culturala te atrage cel mai mult?
      </Text>
      <Slider
        labels={["Istorica & Arhitecturala", "Artistică & vizuală"]}
        callback={(value) => (historyQuestions.current.experienceType = value)}
      />
      <Text style={[styles.text, { marginTop: 55 }]}>
        Ce tip de arta preferi?
      </Text>
      <Slider
        labels={["Populara", "Clasica", "Moderna"]}
        callback={(value) => (historyQuestions.current.artType = value)}
      />
      <Text style={[styles.text, { marginTop: 55 }]}>
        Ce te atrage în special?
      </Text>
      <BorderButtonList
        labels={[
          "Muzee",
          "Expozitii",
          "Galerii de arta",
          "Monumente",
          "Arhitectura",
        ]}
        WIDTH={"90%"}
        callback={(labels) => (historyQuestions.current.locationTypes = labels)}
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

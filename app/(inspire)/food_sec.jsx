import { Text, View, StyleSheet } from "react-native";
import { useContext, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ExperiencesQuestions() {
  const { setFoodQuestions } = useContext(QuestionsContext);
  const FoodQuestions = useRef({
    foodTypes: null,
  });
  const [error, setError] = useState(false);
  const handleContinue = () => {
    const allAnsweared = Object.values(FoodQuestions.current).every((item) => {
      if (Array.isArray(item)) return item.length > 0;
      return Boolean(item);
    });
    if (!allAnsweared) {
      setError(true);
      return;
    }
    setError(false);
    setFoodQuestions((prev) => ({ ...prev, ...FoodQuestions.current }));
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.line} />
      <Text style={styles.text}>
        Preferati un anumit tip de bucatarie sau mancare in special?
      </Text>
      <BorderButtonList
        labels={[
          "Italiana",
          "Asiatica",
          "Mexicana",
          "Indiana",
          "Mediteraneana",
          "Locala & Traditionala",
          "Franceza",
          "Japoneza",
          "Turceasca",
          "Americana",
          "Libaneza",
          "Nu Conteaza",
        ]}
        WIDTH={"90%"}
        callback={(labels) => {
          FoodQuestions.current.foodTypes = labels;
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

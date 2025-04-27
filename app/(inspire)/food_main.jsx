import { Text, View, StyleSheet } from "react-native";
import { useState, useRef, useContext } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";

import GoButton from "@/components/Gobutton";

import AnimatedLogo from "@/components/animatedSmallLogo";
import { useNavigation } from "expo-router";
import { QuestionsContext } from "@/context/QuestionsContext";
export default function ExperiencesQuestions() {
  const { setFoodQuestions } = useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const FoodQuestions = useRef({
    mealType: 0,
    locationType: 0,
    veganOptions: 0,
    ambiance: 0,
  });

  const handleContinue = () => {
    const allAnsweared = Object.values(FoodQuestions.current).every((value) => {
      if (value === 0) return true;
      return Boolean(value);
    });
    if (!allAnsweared) {
      setError(true);
      return;
    }
    setError(false);
    setFoodQuestions(FoodQuestions.current);
    navigation.navigate("food_sec");
  };
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <AnimatedLogo />

      <View style={styles.line} />

      <Text style={styles.text}>Ce masa doriti sa luati?</Text>
      <Slider
        labels={["Mic-dejun", "Brunch", "Pranz", "Cina"]}
        callback={(value) => (FoodQuestions.current.mealType = value)}
      />

      <Text style={[styles.text, { marginTop: 35 }]}>
        Fast food sau locatii sit-down?
      </Text>
      <Slider
        labels={["Fast-Food", "Sit-down", "Premium"]}
        callback={(value) => (FoodQuestions.current.locationType = value)}
      />
      <Text style={[styles.text, { marginTop: 35 }]}>
        Optiunile vegane sunt importante?
      </Text>
      <BorderButtonList
        labels={["Da"]}
        WIDTH={"100%"}
        callback={(labels) =>
          (FoodQuestions.current.veganOptions = labels.length > 0 ? 1 : 0)
        }
      />
      <Text style={styles.text}>Ce tip de ambianta preferi la restaurant?</Text>
      <Slider
        labels={["casual", "sofisticata"]}
        callback={(value) => (FoodQuestions.current.ambiance = value)}
      />
      <View style={{ marginTop: 20 }}>
        <GoButton text={"continua"} onSwipe={handleContinue} />
      </View>
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

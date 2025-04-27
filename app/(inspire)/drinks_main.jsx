import { Text, View, StyleSheet } from "react-native";
import { useContext, useState, useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DrinksQuestions() {
  const { setDrinksQuestions } = useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const DrinksQuestions = useRef({
    groupType: "",
    drinkTypes: [],
    locationTypes: [],
    locationFeatures: [],
  });
  const handleContinue = () => {
    const allAnsweared = Object.values(DrinksQuestions.current).every(
      (item) => {
        if (Array.isArray(item)) {
          return item.length > 0;
        }

        return Boolean(item);
      }
    );
    console.log(
      "🔍 current answers:",
      DrinksQuestions.current,
      "allAnswered?",
      allAnsweared
    );
    if (!allAnsweared) {
      setError(true);

      return;
    }
    setError(false);

    setDrinksQuestions(DrinksQuestions.current);
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.line} />

      <Text style={styles.text}>Sunteti in grup?</Text>
      <BorderButtonList
        labels={["solo", "cuplu", "grup"]}
        WIDTH={"90%"}
        oneOption={true}
        callback={(labels) => (DrinksQuestions.current.groupType = labels[0])}
      />

      <Text style={styles.text}>Ce bauturi doresti să savurezi?</Text>
      <BorderButtonList
        labels={[
          "Cafea",
          "Bere",
          "Vin",
          "Cocktailuri",
          "Ceai",
          "Smoothies",
          "Sucuri de fructe",
          "Nu conteaza",
        ]}
        WIDTH={"90%"}
        callback={(labels) => (DrinksQuestions.current.drinkTypes = labels)}
      />

      <Text style={styles.text}>Preferi anumite tipuri de locatii?</Text>
      <BorderButtonList
        labels={[
          "Cafenea",
          "Bar",
          "Ceainarie",
          "Pub",
          "Lounge",
          "Smoothies bar",
          "Nu conteaza",
        ]}
        WIDTH={"90%"}
        callback={(labels) => (DrinksQuestions.current.locationTypes = labels)}
      />

      <Text style={styles.text}>
        Ce caracteristici ai dori sa aiba locatiile?
      </Text>
      <BorderButtonList
        labels={[
          "Cozy",
          "Vegan",
          "Sanatos",
          "Traditional",
          "Modern",
          "Nu conteaza",
        ]}
        WIDTH={"90%"}
        callback={(labels) =>
          (DrinksQuestions.current.locationFeatures = labels)
        }
      />

      <GoButton text={"continua"} onSwipe={handleContinue} />
      {error ? (
        <Text style={styles.infoText}>Asigura-te ca ai selectat tot!</Text>
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
    marginTop: 8,
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    textAlign: "center",
    color: "red",
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

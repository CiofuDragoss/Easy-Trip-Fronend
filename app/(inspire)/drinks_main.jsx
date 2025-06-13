import { Text, View, StyleSheet } from "react-native";
import { useContext, useState, useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
export default function DrinksQuestions() {
  const { setSecondaryQuestions, setMainQuestions } =
    useContext(QuestionsContext);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const DrinksQuestions = useRef({
    groupType: "",
    drinkTypes: "",
    locationTypes: [],
  });
  const handleContinue = () => {
    const allAnsweared = Object.values(DrinksQuestions.current).every(
      (item) => {
        if (Array.isArray(item)) {
          return item.length > 0;
        }

        if (item == 0 || item == 1) {
          return true;
        }
        return Boolean(item);
      }
    );

    if (!allAnsweared) {
      setError(true);

      return;
    }
    setError(false);
    setMainQuestions((prev) => ({ ...prev, category: "Bauturi" }));
    setSecondaryQuestions(DrinksQuestions.current);
    navigation.replace("Results");
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.line} />

      <Text style={styles.text}>Sunteti in grup?</Text>
      <BorderButtonList
        labels={["da"]}
        WIDTH={"90%"}
        callback={(labels) =>
          (DrinksQuestions.current.groupType = labels.length > 0 ? 1 : 0)
        }
      />

      <Text style={[styles.text, { marginTop: 15, margin: 0 }]}>
        Ce doresti să savurezi?
      </Text>

      <BorderButtonList
        labels={[
          "Cafea",
          "Bere",
          "Vin",
          "Cocktailuri",
          "Dulciuri",
          "Sucuri de fructe",
          "Inghetata",
          "Ceai",
          "Nu conteaza",
        ]}
        WIDTH={"90%"}
        oneOption={true}
        callback={(labels) => (DrinksQuestions.current.drinkTypes = labels[0])}
      />

      <Text style={[styles.text, { margin: 0, marginTop: 15 }]}>
        Preferi anumite tipuri de locatii?
      </Text>
      <Text
        style={[
          styles.text,
          { margin: 0, fontSize: 12, color: "grey", paddingHorizontal: 10 },
        ]}
      >
        Tip: Pentru rezultate cat mai bune, selecteaza tipul de locatii
        relevante pentru ce doresti sa savurezi!
      </Text>
      <BorderButtonList
        labels={[
          "Cafenea",
          "Bar",
          "Ceainarie",
          "Pub",
          "Vinarie",
          "Cofetarie & Dulciuri",
          "Bar de sucuri fresh",
          "Gelaterie",
        ]}
        WIDTH={"90%"}
        callback={(labels) => (DrinksQuestions.current.locationTypes = labels)}
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

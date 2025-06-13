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
    shopping: 0,
    breakk: 0,
    shoppingCategories: [],
    breakDayTime: null,
    breakType: null,
  });
  const navigation = useNavigation();
  const handleContinue = () => {
    const allAnswers = Object.values(ItineraryQuestions.current).every(
      (item) => {
        if (Array.isArray(item) && ItineraryQuestions.current.shopping != 0) {
          return item.length > 0;
        } else if (item === 0) {
          return true;
        }
        return ItineraryQuestions.current.break ? Boolean(item) : true;
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
    navigation.navigate("HowMyDay3");
  };
  return (
    <View style={styles.main}>
      <View style={[styles.line, { borderBottomWidth: 4 }]} />

      <Text
        style={[
          styles.text,
          { margin: 0, marginTop: 15, marginBottom: 10, fontSize: 21 },
        ]}
      >
        Doriti sa faceti o pauza pe parcursul zilei?
      </Text>

      <BorderButtonList
        labels={["Da"]}
        WIDTH={"90%"}
        callback={(labels) => {
          ItineraryQuestions.current.breakk = labels.length > 0 ? 1 : 0;
        }}
      />
      <Text
        style={[
          styles.text,
          { margin: 0, marginTop: 15, marginBottom: 10, fontSize: 17 },
        ]}
      >
        Cand?
      </Text>
      <BorderButtonList
        labels={["In prima parte a zilei", "Dupa-masa"]}
        WIDTH={"90%"}
        oneOption={true}
        callback={(labels) => {
          ItineraryQuestions.current.breakDayTime = labels[0];
        }}
      />
      <Text
        style={[
          styles.text,
          { margin: 0, marginTop: 15, marginBottom: 10, fontSize: 17 },
        ]}
      >
        Ce doriti sa faceti pentru a va relaxa?
      </Text>
      <BorderButtonList
        labels={[
          "Cafenea",
          "Bar",
          "Pub",
          "Gustare dulce",
          "Gustare",
          "Inghetata",

          "Parc",
        ]}
        WIDTH={"90%"}
        oneOption={true}
        callback={(labels) => {
          ItineraryQuestions.current.breakType = labels[0];
        }}
      />
      <View
        style={[
          styles.line,
          { borderBottomWidth: 2, marginTop: 20, marginBottom: 0 },
        ]}
      />
      <Text style={[styles.text, { margin: 0, marginTop: 10, fontSize: 22 }]}>
        Doriti sa faceti cumparaturi?
      </Text>
      <BorderButtonList
        labels={["Da"]}
        WIDTH={"90%"}
        callback={(labels) => {
          ItineraryQuestions.current.shopping = labels.length > 0 ? 1 : 0;
        }}
      />
      <Text
        style={[
          styles.text,
          { margin: 0, marginTop: 15, marginBottom: 10, fontSize: 17 },
        ]}
      >
        Ce doriti sa achizitionati?
      </Text>
      <BorderButtonList
        labels={[
          "Moda si accesorii",
          "Produse locale",
          "Cosmetice si parfumuri",
          "Bijuterii",
          "Souveniruri & Cadouri",
          "Antichitati ",
          "Librarii",
        ]}
        WIDTH={"100%"}
        callback={(labels) =>
          (ItineraryQuestions.current.shoppingCategories = labels)
        }
      />
      <View
        style={[
          styles.line,
          { borderBottomWidth: 2, marginTop: 20, marginBottom: 0 },
        ]}
      />
      <GoButton text={"continua"} onSwipe={handleContinue} />

      {error ? (
        <Text
          style={[
            styles.infoText,
            { color: "red", marginTop: 20, marginBottom: 0 },
          ]}
        >
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

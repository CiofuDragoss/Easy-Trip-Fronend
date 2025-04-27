import { Text, View, StyleSheet } from "react-native";
import { useState, useRef, useContext, useCallback } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useApiWithRefresh } from "@/hooks/refreshHook";
import { sendShopping } from "@/utils/api";
export default function ExperiencesQuestions() {
  const { setShoppingQuestions, MainQuestions } = useContext(QuestionsContext);
  const { startWRefresh } = useApiWithRefresh();
  const [error, setError] = useState(false);
  const ShoppingQuestions = useRef({
    shoppingLocType: 0,
    shoppingExperience: null,
  });

  const send = useCallback(async () => {
    if (!error) {
      console.log("heloooo");
      await startWRefresh(sendShopping, {
        MainQuestions,
        ShoppingQuestions: ShoppingQuestions.current,
      });
    }
  }, [MainQuestions, startWRefresh]);
  const handleContinue = () => {
    const allAnsweared = Object.values(ShoppingQuestions.current).every(
      (value) => {
        if (value === 0) return true;
        else if (Array.isArray(value)) {
          return value.length > 0;
        }
        return Boolean(value);
      }
    );
    if (!allAnsweared) {
      setError(true);
      return;
    }
    setError(false);
    setShoppingQuestions(ShoppingQuestions.current);

    send();
  };
  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.info}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.line} />
        <Text style={styles.infoText}>
          {" "}
          De la malluri comerciale la piete si magazine locale.
        </Text>
      </View>
      <Text style={styles.text}>
        Cat de mult te atrag magazinele sau centrele comerciale mari cu branduri
        renumite fata de cele magazine cu produse locale si autentice?
      </Text>
      <Slider
        labels={["autentic", "global"]}
        callback={(value) =>
          (ShoppingQuestions.current.shoppingLocType = value)
        }
      />

      <Text style={[styles.text, { marginTop: 35 }]}>
        Ce tip de experienta de shopping cauti?
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
          (ShoppingQuestions.current.shoppingExperience = labels)
        }
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

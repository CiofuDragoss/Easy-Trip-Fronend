import { Text, View, StyleSheet, Pressable, Platform } from "react-native";
import { useState, useRef, useContext } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButtonList from "@/components/borderPressable";
import { QuestionsContext } from "@/context/QuestionsContext";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedSmallLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import SwipeListValue from "@/components/flatListValue";

const swipeListData = (() => {
  const result = [];
  for (let i = 1; i <= 10; i++) {
    result.push({ key: i.toString(), value: `${i} ${i == 1 ? "ora" : "ore"}` });
  }
  return result;
})();

export default function NightLifeQuestions() {
  const { setNightLifeQuestions } = useContext(QuestionsContext);
  const NightLifeQuestions = useRef({
    date: new Date().toString(),
    duration: 4,
    groupType: null,
  });
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [show, setShow] = useState(false);
  const handleContinue = () => {
    const allAnswers = Object.values(NightLifeQuestions.current).every(
      (item) => {
        return Boolean(item);
      }
    );
    if (!allAnswers) {
      setError(true);
      return;
    }
    setError(false);
    setNightLifeQuestions(NightLifeQuestions.current);
    navigation.navigate("NightLife_sec");
  };
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (!selectedDate) return;

    const now = new Date();
    const chosen = new Date(now);
    chosen.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
    if (chosen <= now) {
      chosen.setDate(chosen.getDate() + 1);
    }
    setDate(chosen);
    setShowDate(true);
    NightLifeQuestions.current.date = chosen.toString();
  };

  return (
    <View style={styles.main}>
      <AnimatedLogo />
      <View style={styles.info}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.line} />
        <Text style={styles.infoText}>
          {" "}
          Fie ca iti doresti distractie pana dimineata sau un loc linistit
          pentru a savura un cocktail la o discutie, vei avea parte de o seara
          memorabila.
        </Text>
      </View>
      <Text style={styles.text}>
        La ce ora doresti să iti începi seara și cam cat sa dureze?
      </Text>
      <Pressable onPress={() => setShow(true)} style={styles.button}>
        <AntDesign name="clockcircle" size={30} color="black" />
        <Text style={styles.infoText}>ora</Text>
        {show && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Pressable>
      {showDate ? (
        <Text style={[styles.infoText, { marginTop: 20 }]}>
          Ai selectat ora{" "}
          {`${date.getHours()}:${
            date.getMinutes().length == 1
              ? "0" + date.getMinutes()
              : date.getMinutes()
          }`}
        </Text>
      ) : (
        <Text style={[styles.infoText, { marginTop: 20 }]}>{""}</Text>
      )}
      <Text style={styles.text}>Cat timp doresti sa stai?</Text>
      <SwipeListValue
        data={swipeListData}
        onSelectItem={(index) =>
          (NightLifeQuestions.current.duration = swipeListData[index].key)
        }
      />
      <Text style={styles.text}>Solo sau in grup?</Text>
      <BorderButtonList
        labels={["Solo", "Cuplu", "Grup"]}
        oneOption={true}
        WIDTH={"55%"}
        callback={(labels) =>
          (NightLifeQuestions.current.groupType = labels[0])
        }
      />
      <GoButton text={"continua"} onSwipe={handleContinue} />
      {error && (
        <Text style={[styles.infoText, { color: "red", marginTop: 20 }]}>
          Te rog sa completezi toate campurile!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    width: "15%",
    backgroundColor: "white",
    borderWidth: 2,
  },
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

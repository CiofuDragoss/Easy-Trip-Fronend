import { Text, View, StyleSheet, Pressable, Platform } from "react-native";
import { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@/components/slider";
import BorderButton from "@/components/borderPressable";
import BaseQuestions from "@/components/BaseQuestions";
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
  const DATA = new Date();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const navigation = useNavigation();
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
      <Text key={date} style={[styles.infoText, { marginTop: 20 }]}>
        Ai selectat ora {`${date.getHours()}:${date.getMinutes()}`}
      </Text>
      <Text style={styles.text}>Cat timp doresti sa stai?</Text>
      <SwipeListValue data={swipeListData} />
      <Text style={styles.text}>Solo sau in grup?</Text>
      <View
        style={[styles.row, { width: "55%", justifyContent: "space-between" }]}
      >
        <BorderButton text={"Solo"} />
        <BorderButton text={"Cuplu"} />
        <BorderButton text={"Grup"} />
      </View>
      <GoButton
        text={"continua"}
        onSwipe={() => {
          navigation.navigate("NightLife_sec");
        }}
      />
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    flexWrap: "wrap",
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

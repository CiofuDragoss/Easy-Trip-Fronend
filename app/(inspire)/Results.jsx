import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState, useRef, useContext, useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { QuestionsContext } from "@/context/QuestionsContext";
import { useRecommendWs } from "../../hooks/WsHook";
import AnimatedLogo from "@/components/animatedLogo";
import { useNavigation } from "expo-router";
import placeContainer from "@/components/PlaceContainer";
import PlaceContainer from "@/components/PlaceContainer";
export default function Results() {
  const { SecondaryQuestions, MainQuestions } = useContext(QuestionsContext);
  const navigation = useNavigation();
  const { start, stop, responses, error, updates, connecting } = useRecommendWs(
    { MainQuestions, SecondaryQuestions }
  );

  useEffect(() => {
    console.log("salut din resultss");
    if (!responses) {
      start();
    }
    return () => stop();
  }, []);
  if (!responses && !error) {
    return (
      <View style={styles.container}>
        <AnimatedLogo style={{ marginTop: 0 }} />
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={[{ transform: [{ scale: 2 }] }, { marginVertical: 30 }]}
        />
        <Text style={styles.text}>
          {updates ? `${updates.stage} din 2` : "Se incarca....."}
        </Text>
        <Text style={styles.text}>{updates ? `${updates.info}` : ""}</Text>
        <Pressable
          onPress={() => {
            stop();
            navigation.navigate("MainQuestions");
          }}
          style={styles.cancelButton}
        >
          <Text style={[styles.text, { color: "white" }]}>Anuleaza </Text>
        </Pressable>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: "red" }]}>
          S-a intamplat ceva gresit!
        </Text>
        <Pressable
          onPress={() => {
            stop();
            navigation.navigate("MainQuestions");
          }}
          style={styles.cancelButton}
        >
          <Text style={[styles.text, { color: "white" }]}>Inapoi</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Recomandari</Text>
      <PlaceContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 15,
    marginTop: 25,
  },
});

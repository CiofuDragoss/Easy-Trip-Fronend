import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NightLifeQuestions1 from "../app/(inspire)/NightLifeQuestions_1";
import NightLifeQuestions2 from "../app/(inspire)/NightLifeQuestions_2";

const Stack = createNativeStackNavigator();

const QuestionsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="NightLife_Main" component={NightLifeQuestions1} />
      <Stack.Screen name="NightLife_sec" component={NightLifeQuestions2} />
    </Stack.Navigator>
  );
};

export default QuestionsStack;

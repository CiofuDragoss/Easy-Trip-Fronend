import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionProvider from "@/context/QuestionsContext";
import { AuthContext } from "@/context/AuthContext";
import MainQuestions from "@/app/(inspire)/MainQuestions";
import ExperiencesQuestions from "@/app/(inspire)/ExperiencesQuestions";
import NightLifeStack from "./NightLifeStack";
import Results from "@/app/(inspire)/Results";
import HistoryQuestions from "@/app/(inspire)/HistoryQuestions";
import ShoppingQuestions from "@/app/(inspire)/ShoppingQuestions";
import FoodQuestions from "./food&drinksStack";
import StartInspire from "@/app/(inspire)/StartInspire";
const Stack = createNativeStackNavigator();

const QuestionsStack = () => {
  return (
    <QuestionProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="Start" component={StartInspire} />
        <Stack.Screen name="MainQuestions" component={MainQuestions} />
        <Stack.Screen name="Viata de Noapte" component={NightLifeStack} />
        <Stack.Screen name="Istorie & Arta" component={HistoryQuestions} />
        <Stack.Screen name="Experiente" component={ExperiencesQuestions} />
        <Stack.Screen name="Shopping" component={ShoppingQuestions} />
        <Stack.Screen name="Mancare & Bauturi" component={FoodQuestions} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </QuestionProvider>
  );
};

export default QuestionsStack;

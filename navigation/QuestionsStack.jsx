import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionProvider from "@/context/QuestionsContext";
import { AuthContext } from "@/context/AuthContext";
import MainQuestions from "@/app/(inspire)/MainQuestions";
import CategoryQuestions from "@/app/(inspire)/CategoryQuestions";
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
        <Stack.Screen name="CategoryQuestions" component={CategoryQuestions} />
      </Stack.Navigator>
    </QuestionProvider>
  );
};

export default QuestionsStack;

import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationProvider from "@/context/LocationContext";

import QuestionsStack from "@/navigation/QuestionsStack";
import QuestionsItineraryStack from "@/navigation/QuestionsItineraryStack";
import drawerNav from "./drawer_home";
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <LocationProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="Home" component={drawerNav} />
        <Stack.Screen name="InspireQuestionsStack" component={QuestionsStack} />
        <Stack.Screen
          name="ItineraryStack"
          component={QuestionsItineraryStack}
        />
      </Stack.Navigator>
    </LocationProvider>
  );
};

export default AppStack;

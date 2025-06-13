import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionProvider from "@/context/QuestionsContext";
import MainQuestionsItinerary from "@/app/(itinerary)/MainQuestionsItinerary";
import SecondQuestionsItinerary from "@/app/(itinerary)/SecondQuestionsItinerary";
import HowMyDay from "@/app/(itinerary)/HowMyDay";
import HowMyDay2 from "@/app/(itinerary)/HowMyDay2";
import HowMyDay3 from "@/app/(itinerary)/HowMyDay3";
import Results from "@/app/(itinerary)/ResultsItinerary";

import StartInspire from "@/app/(itinerary)/StartItinerary";
const Stack = createNativeStackNavigator();

const QuestionsStack = () => {
  return (
    <QuestionProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="Start" component={StartInspire} />
        <Stack.Screen name="MainQuestions" component={MainQuestionsItinerary} />
        <Stack.Screen
          name="SecondaryQuestions"
          component={SecondQuestionsItinerary}
        />
        <Stack.Screen name="HowMyDay" component={HowMyDay} />
        <Stack.Screen name="HowMyDay2" component={HowMyDay2} />
        <Stack.Screen name="HowMyDay3" component={HowMyDay3} />
        <Stack.Screen
          name="Results"
          options={{ unmountOnBlur: true }}
          component={Results}
        />
      </Stack.Navigator>
    </QuestionProvider>
  );
};

export default QuestionsStack;

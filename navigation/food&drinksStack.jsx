import FStack from "./f_stack";
import DrinksQuestions from "@/app/(inspire)/drinks_main";
import FoodStart from "@/app/(inspire)/foodStart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const FoodDrinksStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name={"foodStart"} component={FoodStart} />
      <Stack.Screen name={"Mancare"} component={FStack} />
      <Stack.Screen name={"Bauturi"} component={DrinksQuestions} />
    </Stack.Navigator>
  );
};

export default FoodDrinksStack;

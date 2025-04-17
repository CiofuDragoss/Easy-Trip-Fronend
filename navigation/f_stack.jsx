import FoodMain from "@/app/(inspire)/food_main";
import FoodSec from "@/app/(inspire)/food_sec";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const FStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name={"food_main"} component={FoodMain} />
      <Stack.Screen name={"food_sec"} component={FoodSec} />
    </Stack.Navigator>
  );
};

export default FStack;

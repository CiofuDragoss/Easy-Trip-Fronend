import HomePage from "@/app/(app)/HomePage";
import BaseScreen from "@/app/(app)/BaseScreen";
import ProfileDetails from "@/app/(app)/ProfileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import QuestionsStack from "./QuestionsStack";
const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fafafa",
          width: "70%",
        },
        drawerActiveBackgroundColor: "#e0ffe0",
        drawerActiveTintColor: "#e91e63",
        drawerInactiveTintColor: "#000",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Acasa" component={HomePage} />
      <Drawer.Screen name="Profile" component={ProfileDetails} />
      <Drawer.Screen name="Settings" component={BaseScreen} />
    </Drawer.Navigator>
  );
}

import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./AppStack";
import AuthPage from "@/app/(auth)/AuthPage";
import { LoadingScreen } from "@/components/loading_scr";
const Stack = createNativeStackNavigator();
export const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View>
        <LoadingScreen />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Screen name="Auth" component={AuthPage} />
      ) : (
        <Stack.Screen name="HomeStack" component={AppStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNav;

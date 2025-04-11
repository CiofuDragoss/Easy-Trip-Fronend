import { View, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
};

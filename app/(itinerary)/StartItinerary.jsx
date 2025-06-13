import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Map from "@/components/mapComps/BasicMap";
import GoButton from "@/components/Gobutton";
import AnimatedLogo from "@/components/animatedLogo";
import { AuthContext } from "@/context/AuthContext";
import LocationInput from "@/components/mapComps/LocationInput";
export default function StartItinerary() {
  const { isLoading, userToken, logOut } = useContext(AuthContext);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const fadeIn = () =>
    Animated.timing(opacityAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();

  const fadeOut = () =>
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      fadeOut
    );
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      fadeIn
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.MainView}>
      <View style={styles.TopView}>
        <AnimatedLogo style={{ marginTop: 10 }} />
        <LocationInput token={userToken} />
      </View>
      <Animated.View style={[styles.MapView, { opacity: opacityAnim }]}>
        <Map></Map>
      </Animated.View>
      <View style={styles.BottomView}>
        <GoButton
          text={"continua"}
          onSwipe={() => {
            console.log("sall");
            navigation.navigate("MainQuestions");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  MapView: {
    marginTop: "5%",
    height: "60%",
    width: "95%",
  },
  TopView: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  BottomView: {
    marginTop: "5%",
    height: "25%",
    alignItems: "center",
  },
  locationText: {
    paddingTop: 20,
    fontFamily: "Poppins-Bold",
    fontSize: 30,
  },
});

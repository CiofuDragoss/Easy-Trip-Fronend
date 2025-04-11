import { useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import colors from "@/constants/colors";
import AnimatedLogo from "@/components/animatedSmallLogo";
import MenuButton from "@/components/MenuPressable";
import { useNavigation } from "@react-navigation/native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function HomePage() {
  const navigation = useNavigation();
  const [rowWidth, setRowWidth] = useState(0);
  const [logoWidth, setLogoWidth] = useState(0);
  const [button, setButtonWidth] = useState(0);
  const animatedLogoOffset = (rowWidth - logoWidth) / 2 - button;

  return (
    <View style={styles.container}>
      <View
        style={styles.row}
        onLayout={(e) => {
          setRowWidth(e.nativeEvent.layout.width);
        }}
      >
        <View
          style={{ alignSelf: "flex-start" }}
          onLayout={(e) => {
            setButtonWidth(e.nativeEvent.layout.width);
          }}
        >
          <MenuButton onPress={() => navigation.openDrawer()} />
        </View>
        <View
          style={[styles.AnimatedLogo, { marginLeft: animatedLogoOffset }]}
          onLayout={(e) => {
            setLogoWidth(e.nativeEvent.layout.width);
          }}
        >
          <AnimatedLogo />
        </View>
      </View>
      <View style={styles.MainContent}>
        <Text style={[styles.title, { marginTop: 10 }]}>Creaza amintiri</Text>

        <Pressable
          style={styles.InspireButton}
          onPress={() => navigation.navigate("Inspira-ma")}
        >
          <Text style={styles.title}>Inspira-ma</Text>
        </Pressable>
        <Text style={styles.title}>Recomandarile tale anterioare</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InspireButton: {
    marginTop: "2%",
    marginBottom: "2%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "10%",
    backgroundColor: "green",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  MainContent: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: "30%",
  },
  row: {
    marginTop: "3%",
    width: "100%",
    height: "11%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  AnimatedLogo: {
    marginVertical: 10,
  },
});

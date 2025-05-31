import { useEffect, useContext, useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import { useNavigation } from "expo-router";
import { QuestionsContext } from "@/context/QuestionsContext";
import BorderButtonList from "@/components/borderPressable";
import Slider from "@/components/slider";
import {
  FontAwesome5,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";
import { useLocation } from "@/context/LocationContext";
import SwipeList from "@/components/swipeList";
import SwipeListValue from "@/components/flatListValue";
import AnimatedQuestion from "@/components/animatedQustion";
import GoButton from "@/components/Gobutton";

export default function MainQuestions() {
  const { location } = useLocation();
  const navigation = useNavigation();

  const { setMainQuestions } = useContext(QuestionsContext);
  const [selectedCategory, setSelectedCategory] = useState(2);
  const [selectedDistance, setSelectedDistance] = useState(3);
  const budgetRef = useRef(0);

  const handleSwipe = () => {
    setMainQuestions({
      region: location,
      category: categories[selectedCategory].title,
      distance: parseInt(distanta[selectedDistance].key),
      budget: budgetRef.current,
    });
    console.log("before navigation, selectedCategory index:", selectedCategory);
    console.log(
      "Category set for navigation:",
      categories[selectedCategory].title
    );
    console.log("navigam laa: ", categories[selectedCategory].title);
    navigation.navigate(categories[selectedCategory].title);
  };
  return (
    <View style={styles.mainContainer}>
      <AnimatedQuestion
        text={"Pentru ce ai nevoie de inspiratie?"}
        repeat={true}
      />

      <SwipeList data={categories} onSelectItem={setSelectedCategory} />
      <AnimatedQuestion
        text={" Distanta maxima fata de locurile recomandate: "}
        repeat={false}
      />

      <SwipeListValue data={distanta} onSelectItem={setSelectedDistance} />
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={[styles.text, { color: "grey", fontSize: 14 }]}>
          Gandeste-te daca doresti sa mergi pe jos sau esti dispus sa platesti
          un taxi.
        </Text>
      </View>
      <Text style={styles.text}>Care este bugetul tau?</Text>
      <Slider
        labels={["$", "$$", "$$$"]}
        callback={(value) => (budgetRef.current = value)}
      />

      <GoButton
        key={selectedCategory}
        text={"continua"}
        onSwipe={handleSwipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textQuestions: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    textAlign: "center",
  },
});

const { width } = Dimensions.get("window");
const distanta = (() => {
  const result = [];
  for (let i = 1; i <= 60; i++) {
    result.push({ key: i.toString(), value: `${i} km` });
  }
  return result;
})();

const categories = [
  {
    key: "1",
    title: "Viata de Noapte",
    description:
      "Distractie pana dimineata. Cele mai bune cluburi si locatii din zona. ",
    icon: (
      <MaterialCommunityIcons name="party-popper" size={24} color="black" />
    ),
  },

  {
    key: "2",
    title: "Istorie & Arta",
    description:
      "De la monumente istorice pana la cele mai interesante muzee,galerii de arta si expozitii. ",
    icon: <MaterialCommunityIcons name="castle" size={24} color="black" />,
  },
  {
    key: "3",
    title: "Experiente",
    description:
      "Plaja, ski, drumetii, spa, zoo sau o plimbare relaxanta in parc, totul depinde de locul minunat in care te afli. ",
    icon: <FontAwesome5 name="umbrella-beach" size={24} color="black" />,
  },

  {
    key: "4",
    title: "Shopping",
    description:
      "Shopping si Malls. Piete locale si magazine de suveniruri. Afla cele mai bune locatii din zona. ",
    icon: <FontAwesome name="shopping-bag" size={24} color="black" />,
  },
  {
    key: "5",
    title: "Mancare & Bauturi",
    description:
      "De la restaurante pana la fast-food si specialitati locale. Cele mai bune cafenele si baruri. ",
    icon: <FontAwesome6 name="bowl-food" size={24} color="black" />,
  },
];

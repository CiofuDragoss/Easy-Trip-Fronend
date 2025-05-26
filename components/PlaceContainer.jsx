import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Gradient from "./Gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PhotoList from "@/components/PhotoList";
import AntDesign from "@expo/vector-icons/AntDesign";
import OpeningHours from "@/components/OpeningHours";
import AnimatedLogo from "@/components/animatedSmallLogo";
import CleanButton from "@/components/CleanButton";
export default function PlaceContainer({ place }) {
  const {
    display,
    photos,
    highlights,
    openingHours,
    ratingScore,
    distance,
    placeId,
    latitude,
    longitude,
  } = place;
  return (
    <Gradient style={styles.container} color={"#d1dbeb"} x={0.7}>
      <Text style={styles.textTitle}>{display}</Text>
      <View style={{ height: 360 }}>
        <PhotoList photos={photos} />
      </View>

      <Gradient style={styles.line} color={"black"} x={0.6} />
      <View style={styles.schedule}>
        <FontAwesome name="clock-o" size={35} color="black" />
        <OpeningHours
          openingHours={place.openingHours}
          container={{ padding: 8 }}
          text1={styles.textOrarStatus}
          text2={styles.textOrar}
        />
      </View>
      <Gradient style={styles.line} color={"black"} x={0.6} />

      <View style={styles.row}>
        <AnimatedLogo
          style={{ marginHorizontal: 2 }}
          style2={{ fontSize: 24 }}
          style3={{ right: -8, top: 9 }}
          size={10}
        />
        <Text style={styles.text}>rating</Text>
        <Text
          style={[
            styles.textBold,
            { marginLeft: 12, fontSize: 21, marginBottom: 2 },
          ]}
        >
          {(ratingScore * 5).toFixed(2)}
        </Text>
        <AntDesign
          name="star"
          size={16}
          color="black"
          style={{ marginBottom: 14, marginLeft: 4 }}
        />
      </View>
      <View style={styles.row}>
        <AnimatedLogo
          style={{ marginHorizontal: 2 }}
          style2={{ fontSize: 24 }}
          style3={{ right: -8, top: 9 }}
          size={10}
        />
        <Text style={styles.text}>distance</Text>
        <Text
          style={[
            styles.textBold,
            { marginLeft: 12, fontSize: 21, marginBottom: 2 },
          ]}
        >
          {(distance / 1000).toFixed(2)} Km
        </Text>
      </View>
      <View style={styles.row}>
        <AnimatedLogo
          style={{ marginHorizontal: 2 }}
          style2={{ fontSize: 24 }}
          style3={{ right: -8, top: 9 }}
          size={10}
        />
        <Text style={styles.text}>mapView</Text>
        <CleanButton
          onPress={() => {
            const url = `https://www.google.com/maps/search/?api=1&query=${display}&query_place_id=${placeId.trim()}`;
            console.log(placeId);
            Linking.openURL(url);
          }}
        />
      </View>
      <View style={styles.highligths}>
        <View style={[styles.row]}>
          <AnimatedLogo
            style={{ marginHorizontal: 2 }}
            style2={{ fontSize: 24 }}
            style3={{ right: -8, top: 9 }}
            size={10}
          />
          <Text style={styles.text}>highlights</Text>
          <MaterialCommunityIcons
            name="check-decagram"
            size={20}
            color="#007BFF"
            style={{ marginBottom: 13, marginLeft: 9 }}
          />
        </View>
        <View
          style={[
            styles.line,
            {
              marginTop: 15,
              marginBottom: 5,
              backgroundColor: "black",
              width: 50,
            },
          ]}
        />
        {highlights.map((highlight, idx) => (
          <Text style={[styles.textHighlight, { marginBottom: 1 }]} key={idx}>
            {highlight}
          </Text>
        ))}
        <View
          style={[
            styles.line,
            {
              marginTop: 5,
              marginBottom: 15,
              backgroundColor: "black",
              width: 50,
            },
          ]}
        />
      </View>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "flex-end",
  },
  line: {
    width: 90,
    height: 3,
    backgroundColor: "blue",
    borderRadius: 10,
    marginTop: 10,
  },
  schedule: {
    marginTop: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  highligths: {
    alignItems: "center",
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  container: {
    width: "90%",
    backgroundColor: "#556887",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    fontSize: 12,
    color: "#007BFF",
    fontFamily: "Poppins-Bold",
  },

  textBold: {
    textAlign: "center",
    fontSize: 16,
    color: "black",

    fontFamily: "Poppins-Medium",
  },

  textTitle: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 22,
    color: "#182336",
    fontFamily: "Poppins-Bold",
  },
  textOrar: {
    textAlign: "center",
    fontSize: 17,
    color: "black",
    fontFamily: "Poppins-Medium",
  },
  textHighlight: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  textOrarStatus: {
    textAlign: "center",
    fontSize: 19,
    color: "#007BFF",
    fontFamily: "Poppins-Bold",
  },
});

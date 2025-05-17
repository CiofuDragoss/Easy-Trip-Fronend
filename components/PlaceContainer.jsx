import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Gradient from "@/components/Gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PhotoList from "@/components/PhotoList";
export default function PlaceContainer({ place }) {
  const { display, photos, highlights, openingHours } = place;
  console.log("salut");
  return (
    <Gradient color="lightblue" style={styles.container}>
      <Text style={styles.textTitle}>{display}</Text>
      <View style={{ height: 360 }}>
        <PhotoList photos={photos} />
      </View>
      <Gradient color="blue" style={styles.schedule}>
        <FontAwesome
          name="clock-o"
          size={28}
          color="white"
          style={{ marginVertical: 5 }}
        />
        <Text style={styles.textBold}>Deschis acum</Text>
        <Text style={styles.text}>Luni-Vineri: 9:00 - 17:00</Text>
        <Text style={styles.text}>sambata</Text>
        <Text style={styles.text}>duminica</Text>
      </Gradient>
      <Gradient color="gold" style={styles.highligths}>
        <Text style={styles.textBold}>Puncte forte :</Text>
        <Text style={styles.text}>- 10% discount</Text>
        <Text style={styles.text}>- 20% discount</Text>
        <Text style={styles.text}>- 30% discount</Text>
      </Gradient>
      <MaterialCommunityIcons name="google-maps" size={24} color="black" />
    </Gradient>
  );
}

const styles = StyleSheet.create({
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

    borderRadius: 18,

    alignItems: "center",
  },

  text: {
    textAlign: "center",
    marginHorizontal: 7,
    fontSize: 19,
    color: "white",
    fontFamily: "Poppins-Medium",
  },

  textBold: {
    textAlign: "center",
    fontSize: 19,
    color: "white",
    fontFamily: "Poppins-Bold",
  },

  textTitle: {
    textAlign: "center",
    fontSize: 22,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
});

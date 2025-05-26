import { useState, useEffect, useRef } from "react-native";
import {
  SectionList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Gradient from "./Gradient";
import PlaceContainer from "@/components/PlaceContainer";

export default function PlacesDisplayList({ results }) {
  const sections = Object.entries(results.data).map(([category, data]) => ({
    title: category,
    data,
  }));
  return (
    <SectionList
      ListFooterComponent={<View style={{ height: 30 }} />}
      style={{ width: "100%" }}
      sections={sections}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.header}>{title}</Text>
          <Gradient style={styles.line} color={"black"} x={0.6} />
        </View>
      )}
      keyExtractor={(item) => item.placeId}
      renderItem={({ item }) => <PlaceContainer place={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={[styles.content]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    width: "35%",
    height: 3,
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginBottom: 15,
  },
  content: {
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    margin: 5,
  },
  separator: {
    height: 12,
  },
});

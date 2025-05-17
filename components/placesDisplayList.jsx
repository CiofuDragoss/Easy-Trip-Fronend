import { useState, useEffect, useRef } from "react-native";
import {
  SectionList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import PlaceContainer from "@/components/PlaceContainer";
export default function PlacesDisplayList({ results }) {
  const sections = Object.entries(results.data).map(([category, data]) => ({
    title: category,
    data,
  }));
  return (
    <SectionList
      ListFooterComponent={<View style={{ height: 30 }} />}
      style={{ borderRadius: 15, borderWidth: 2, backgroundColor: "#f0e9e9" }}
      sections={sections}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header}>{title}</Text>
          <View style={styles.line} />
        </View>
      )}
      keyExtractor={(item) => item.placeId}
      renderItem={({ item }) => <PlaceContainer place={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={[styles.content, { paddingBottom: 45 }]}
    />
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
  line: {
    width: "20%",
    height: 3,
    backgroundColor: "grey",
    borderRadius: 10,
    marginBottom: 15,
  },
  content: {
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 25,
  },
  separator: {
    height: 12,
  },
});

import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Image } from "expo-image";
import usePhotoCache from "../hooks/PhotoCacheHook";
const { width: WINDOW_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = WINDOW_WIDTH * 0.9;
const ITEM_SIZE = 350;
const SEPARATOR = 20;
function ImageLoader({ uri }) {
  const [loading, setLoading] = useState(true);
  return (
    <View style={[styles.container, { width: ITEM_SIZE, height: ITEM_SIZE }]}>
      <Image
        source={uri}
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
      )}
    </View>
  );
}
export default function PhotoList({ photos }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const urls = usePhotoCache({ photos });
  if (urls === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item: uri, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_SIZE + SEPARATOR),
      index * (ITEM_SIZE + SEPARATOR),
      (index + 1) * (ITEM_SIZE + SEPARATOR),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.2, 1, 0.2],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={[styles.card, { opacity }, { transform: [{ scale }] }]}
      >
        <ImageLoader uri={uri} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      style={{ width: CONTAINER_WIDTH - 10 }}
      data={urls}
      horizontal
      showsHorizontalScrollIndicator={true}
      keyExtractor={(_, i) => String(i)}
      contentContainerStyle={{
        paddingHorizontal: (WINDOW_WIDTH - ITEM_SIZE - SEPARATOR * 2 - 10) / 2,
      }}
      snapToInterval={ITEM_SIZE + SEPARATOR}
      decelerationRate="fast"
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      ItemSeparatorComponent={() => <View style={{ width: SEPARATOR }} />}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    width: CONTAINER_WIDTH,
    height: ITEM_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 20,
    overflow: "hidden",
  },
});

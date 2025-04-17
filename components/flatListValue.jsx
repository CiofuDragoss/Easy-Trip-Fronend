import React, { useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = Math.round((width / 2) * 0.32);

const SEPARATOR_WIDTH = 10;

export default function SwipeListValue({ data, onSelectItem }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SEPARATOR_WIDTH),
      index * (ITEM_WIDTH + SEPARATOR_WIDTH),
      (index + 1) * (ITEM_WIDTH + SEPARATOR_WIDTH),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.inputContainer,
          { transform: [{ scale }], opacity: opacity },
        ]}
      >
        <Text style={styles.text}>{item.value}</Text>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.key}
        initialScrollIndex={3}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + SEPARATOR_WIDTH,
          offset: (ITEM_WIDTH + SEPARATOR_WIDTH) * index,
          index,
        })}
        snapToInterval={ITEM_WIDTH + SEPARATOR_WIDTH}
        renderItem={renderItem}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / (ITEM_WIDTH + SEPARATOR_WIDTH));

          onSelectItem?.(index);
        }}
        contentContainerStyle={{
          alignItems: "center",

          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: SEPARATOR_WIDTH }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 5,
    height: 60,
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
});

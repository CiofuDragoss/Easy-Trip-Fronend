import { useRef } from "react";
import { Animated, View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = Math.round(width * 0.32);

const SEPARATOR_WIDTH = 10;

export default function FlatListCarousel({ data, onSelectItem }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SEPARATOR_WIDTH),
      index * (ITEM_WIDTH + SEPARATOR_WIDTH),
      (index + 1) * (ITEM_WIDTH + SEPARATOR_WIDTH),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          { transform: [{ scale }], opacity: opacity },
        ]}
      >
        {item.icon}
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.line} />
        <Text style={styles.secondaryText}>{item.description}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        snapToInterval={ITEM_WIDTH + SEPARATOR_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={2}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + SEPARATOR_WIDTH,
          offset: (ITEM_WIDTH + SEPARATOR_WIDTH) * index,
          index,
        })}
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
  container: {
    height: 300,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: 300,
    backgroundColor: "#4dc2c2",
    borderRadius: 10,
    paddingTop: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 20,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  secondaryText: {
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  line: {
    borderBottomColor: "gray",
    width: "30%",
    marginBottom: 5,
    borderBottomWidth: 1,
    marginVertical: 2,
  },
});

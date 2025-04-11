import { useState, useCallback, useEffect } from "react";
import {
  TextInput,
  FlatList,
  Pressable,
  View,
  Text,
  StyleSheet,
  Keyboard,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocation } from "@/context/LocationContext";

export default function LocationInput({ token }) {
  const {
    query,
    SetQuery,
    setPredictions,
    predictions,
    errorMessage,
    handleTextChange,
    setPlaceId,
    preciseLocationGranted,
    requestPreciseLocation,
  } = useLocation();
  const [keyboard, setKeyboard] = useState(true);

  useEffect(() => {
    const showList = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboard(true);
    });
    const hideList = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboard(false);
    });
    return () => {
      showList.remove();
      hideList.remove();
    };
  }, []);

  const renderPrediction = ({ item }) => {
    return (
      <Pressable
        style={styles.predictionItem}
        onPress={() => {
          SetQuery(item.main_text);
          setPlaceId(item.place_id);
          setPredictions([]);
          Keyboard.dismiss();
        }}
      >
        <Text style={styles.mainText}>{item.main_text}</Text>
        <Text style={styles.secondaryText}>{item.secondary_text}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={[styles.inputView]}>
          <TextInput
            style={styles.inputLocation}
            placeholder="locatia ta este..."
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={handleTextChange}
          />
        </View>
        <Pressable
          style={styles.autoLocButton}
          onPress={requestPreciseLocation}
        >
          <Entypo name="location-pin" size={28} color="black" />
        </Pressable>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {query.length > 2 && predictions.length > 0 && keyboard && (
        <FlatList
          data={predictions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPrediction}
          style={styles.predictionsList}
          keyboardShouldPersistTaps="always"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputView: {
    borderWidth: 2,
    borderStyle: "solid",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
    height: 50,
    minWidth: "50%",
    maxWidth: "50%",
    position: "relative",
  },
  predictionsList: {
    position: "absolute",
    top: 50,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    maxHeight: 200,
    maxWidth: "60%",
  },
  predictionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  inputLocation: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
  secondaryText: {
    fontSize: 11,
    color: "#666",
  },
  autoLocButton: {
    borderWidth: 2,
    padding: 3,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    backgroundColor: "lightblue",
  },
});

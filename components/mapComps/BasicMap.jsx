import React, { useContext, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { LoadingScreen } from "@/components/loading_scr";
import { useLocation } from "@/context/LocationContext";
export default function Map() {
  const { location, preciseLocationGranted, placeId } = useLocation();
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [location]);
  if (location === null) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen />
      </View>
    );
  }

  const region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: location.latitude_delta,
    longitudeDelta: location.longitude_delta,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={preciseLocationGranted}
      >
        {!preciseLocationGranted && placeId && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Locația ta"
            description="Daca e ok , continua."
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

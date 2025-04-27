import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { useApiWithRefresh } from "@/hooks/refreshHook";
import {
  debounce,
  fetchPredictions,
  getIpLoc,
  getPlaceGeoLoc,
} from "@/utils/api";
import * as Location from "expo-location";

import { AuthContext } from "@/context/AuthContext";

const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const { userToken: token } = useContext(AuthContext);
  const { startWRefresh } = useApiWithRefresh();
  const [location, setLocation] = useState(null);
  const [query, SetQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [preciseLocationGranted, setPreciseLocationGranted] = useState(false);
  const loc_ref = useRef({});
  useEffect(() => {
    if (token && !placeId && !preciseLocationGranted) {
      const fetchLocation = async () => {
        try {
          console.log("sal");
          const loc = await startWRefresh(getIpLoc);
          const loc_json = await loc.json();
          console.log(
            "locatie este :" + loc_json.longitude + loc_json.latitude
          );
          setLocation(loc_json);
        } catch (error) {
          setErrorMessage(error.message);
        }
      };

      fetchLocation();
    }
  }, [token, placeId, preciseLocationGranted, startWRefresh]);

  useEffect(() => {
    const fetchPlaceId = async () => {
      console.log("place iddd:", placeId);
      if (token && placeId && !preciseLocationGranted) {
        try {
          const loc = await startWRefresh(getPlaceGeoLoc, placeId);
          if (!loc.ok) {
            throw new Error("Ceva este in neregula.");
          }
          const loc_json = await loc.json();
          loc_ref.current = loc_json;
          setLocation(loc_json);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchPlaceId();
  }, [token, placeId, preciseLocationGranted, startWRefresh]);

  const requestPreciseLocation = async () => {
    if (preciseLocationGranted) {
      setPreciseLocationGranted(false);
    } else {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status == "granted") {
          setPreciseLocationGranted(true);
          const currentLocation = await Location.getCurrentPositionAsync({});
          const loc = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitude_delta: 0.005,
            longitude_delta: 0.005,
          };
          loc_ref.current = loc;
          setLocation(loc);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };
  const debouncedFetchPredictions = useCallback(
    debounce(async (text) => {
      try {
        const results = await startWRefresh(fetchPredictions, text);
        if (!results.ok) {
          throw new Error("Ceva este in neregula.");
        }
        const results_json = await results.json();
        setPredictions(results_json.predictions);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
        setPredictions([]);
      }
    }, 500),
    [token]
  );
  const handleTextChange = (text) => {
    SetQuery(text);
    if (text.length > 2) {
      debouncedFetchPredictions(text);
    } else {
      setPredictions([]);
      setErrorMessage("");
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        query,
        SetQuery,
        predictions,
        setPredictions,
        errorMessage,
        setErrorMessage,
        handleTextChange,
        placeId,
        setPlaceId,
        preciseLocationGranted,
        requestPreciseLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);

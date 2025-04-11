import routes from "@/constants/routes";

//functie pentru url ul de baza al bakcendului
const BASE_URL = routes.backend_base;
const GET_IP = routes.get_ip;
const GET_IP_LOCATION = routes.get_ip_loc;
//functie pentru recomandari as_u_type de locatie
export async function fetchPredictions(query, token) {
  try {
    const response = await fetch(
      `${BASE_URL}/location_autocomplete?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Eroare de la API.");
    }
    const data = await response.json();
    return data.predictions;
  } catch (error) {
    throw error;
  }
}

export async function getIpLoc(token) {
  try {
    const locationResponse = await fetch(`${BASE_URL}/ip_location`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!locationResponse.ok) {
      const error = await locationResponse.json();
      throw new Error(error.detail);
    }
    const locationData = await locationResponse.json();
    return locationData;
  } catch (error) {
    throw error;
  }
}

export async function getPlaceGeoLoc(token, placeId) {
  try {
    const response = await fetch(
      `${BASE_URL}/get_placeid_loc?query=${placeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Eroare de la API.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

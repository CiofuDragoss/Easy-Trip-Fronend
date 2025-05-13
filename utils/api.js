import routes from "@/constants/routes";

const BASE_URL = routes.backend_base;
export async function resolve_photos(token, photos) {
  const response = await fetch(`${BASE_URL}/resolve_img_urls`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(photos),
  });
  return response;
}
export async function refresh(token) {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
export async function fetchPredictions(token, query) {
  const url = new URL(`${BASE_URL}/location_autocomplete`);
  url.searchParams.set("input", query);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function getIpLoc(token) {
  const { ip } = await fetch("https://api.ipify.org?format=json").then((r) =>
    r.json()
  );
  const locationResponse = await fetch(
    `${BASE_URL}/ip_location?publicIp=${ip}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return locationResponse;
}

export async function checkToken(token) {
  const response = await fetch(`${BASE_URL}/auth/verify_access`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function sendQuestions(token, data) {
  const response = await fetch(`${BASE_URL}/shopping_questions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  print("avem body", JSON.stringify(data));
  return response;
}
export async function getPlaceGeoLoc(token, placeIdd) {
  const response = await fetch(`${BASE_URL}/get_placeid_loc`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ placeId: placeIdd }),
  });
  return response;
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

import { useState, useEffect } from "react";
import { useApiWithRefresh } from "@/hooks/refreshHook";
import { resolve_photos } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_TTL = 3 * 7 * 24 * 60 * 60 * 1000;

const CACHE_PREFIX = "PHOTO_CACHE:";
function cacheKey(photoName) {
  return CACHE_PREFIX + photoName;
}

async function getCachedUrl(photoName) {
  const key = cacheKey(photoName);
  const json = await AsyncStorage.getItem(key);
  if (!json) return null;

  try {
    const { url, ts } = JSON.parse(json);
    if (Date.now() - ts < CACHE_TTL) {
      return url;
    }
    await AsyncStorage.removeItem(key);
    return null;
  } catch (e) {
    await AsyncStorage.removeItem(key);
    return null;
  }
}

async function setCachedUrl(photoName, url) {
  const key = cacheKey(photoName);
  const json = JSON.stringify({ url, ts: Date.now() });
  await AsyncStorage.setItem(key, json);
}

export default function usePhotoCache({ photos }) {
  const [urls, setUrls] = useState(null);
  const { startWRefresh } = useApiWithRefresh();

  useEffect(() => {
    let canceled = false;
    (async () => {
      if (photos.length === 0) {
        if (!canceled) setUrls([]);
        return;
      }
      const fromCache = await Promise.all(
        photos.map((name) => getCachedUrl(name))
      );

      const toResolve = [];

      fromCache.forEach((url, idx) => {
        if (!url) toResolve.push({ idx, name: photos[idx] });
      });
      let new_urls = [];
      if (toResolve.length > 0) {
        const names = toResolve.map((item) => item.name);
        const response = await startWRefresh(resolve_photos, names);
        new_urls = await response.json();
      }

      const finalUrls = [...fromCache];
      toResolve.forEach(({ idx, name }, i) => {
        const url = new_urls[i] || null;
        finalUrls[idx] = url;
        if (url) {
          setCachedUrl(name, url);
        }
      });

      if (!canceled) {
        setUrls(finalUrls);
      }
    })();
    return () => (canceled = true);
  }, [photos.slice().sort().join(",")]);

  return urls;
}

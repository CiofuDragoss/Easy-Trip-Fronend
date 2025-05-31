import { useState, useEffect } from "react";
import { useApiWithRefresh } from "@/hooks/refreshHook";
import { resolve_photos } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_TTL = 3 * 7 * 24 * 60 * 60 * 1000;

const CACHE_PREFIX = "PHOTO_CACHE:";
const limit = 1;
let a = 0;
function cacheKey(photoName) {
  return CACHE_PREFIX + photoName;
}

async function getCachedUrl(photoName) {
  const key = cacheKey(photoName);
  const json = await AsyncStorage.getItem(key);

  if (!json) return null;
  console.log("\nSUCCESS:");
  try {
    const { url, ts } = JSON.parse(json);
    if (Date.now() - ts < CACHE_TTL) {
      return url;
    } else {
      await AsyncStorage.removeItem(key);
      return null;
    }
  } catch (e) {
    await AsyncStorage.removeItem(key);
    return null;
  }
}

async function setCachedUrl(photoName, url) {
  let count = 0;
  const key = cacheKey(photoName);
  const dataToStore = { url, ts: Date.now() };

  try {
    await AsyncStorage.setItem(key, JSON.stringify(dataToStore));
    count += 1;
    console.log("am scris in cache!");
  } catch (error) {}
}
const test = async () => {
  console.log("sal");
  try {
    const v = await getCachedUrl(
      "places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNQatrZXj5cldtqkDFUAoj-w80AMrv26VYKTEiEF02UJAaS2BmHR7MhL6vNGj47x0wQUqXFdw5iaBeOlOnl9eZ3uoFT0RV6Eh0gBjFXDqD1trpotd3UKoAZYdioBSCs4PpMGL1zlft53NOjB0ihWtDwSCPOiMZcVa22utHyUIw14YS1OLvr2zXzE2zUaMacyA4tXtAOb8D5iykubq_xT5ku0gxQpULZ84UHY6AzEr1cf76SIePaOBy_nlI78v1aw_Wmo9J0_Q1rtT_LpdBAIUQZr3APOw79USdMu_I9HDBTrmMjGLUl0yuhb-KxdPlcNHQ54sYYQl_O_4eAF6hw6AnzoX3rZZ_Qa0QuqqvjbYozJbILXQmRPLTtqJes_uVbqD-k-W2WbvhdNuvTMJR_RYlNzjCQ3xTDi_-QVSTRQCbTCHA"
    );
    console.log("okkk", v);
  } catch (e) {
    console.error("🔥 getCachedUrl error:", e);
  }
};
const key1 =
  "PHOTO_CACHE:places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNToqjuOyyNoxhxELc1bWhYHmEXljRQ9gJ1DeUtz4GBk8pIu9KHINrTInTlF68Vr8H60fdIdSbirMVslrXUEtfIDShhHgzWsc6GN6Hjepted4x1ft9Dz1TkQkP_pmbflHAeWlvDAHrjCGpiQRH6Uu91Lp6a78FctelWwCyLQAjvDiV9-JlFEm7pHuLyH1v9y70qL2aqYGpRwq1HP--ePtJoFWqDMPW5YuMMdXuYlpx88AE3ZSat8SwPROSx8mTKP4ECQOV5rxWgYPK9By66_1m-cwSykgJ06B5P5_Hc6kYwH9W8UCF7Gsiiy1PXDve9t5RyGS_mXlXBXQHOsJgcb0FeioZfRGTJC0SPohYC3xf1Nwlk__xr44brDhhAmp8Mbl8ohK2T0P4ZtrBnmWanCYDgUApM25z8pnPg5tjs9tlw";
const name1 =
  "places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNToqjuOyyNoxhxELc1bWhYHmEXljRQ9gJ1DeUtz4GBk8pIu9KHINrTInTlF68Vr8H60fdIdSbirMVslrXUEtfIDShhHgzWsc6GN6Hjepted4x1ft9Dz1TkQkP_pmbflHAeWlvDAHrjCGpiQRH6Uu91Lp6a78FctelWwCyLQAjvDiV9-JlFEm7pHuLyH1v9y70qL2aqYGpRwq1HP--ePtJoFWqDMPW5YuMMdXuYlpx88AE3ZSat8SwPROSx8mTKP4ECQOV5rxWgYPK9By66_1m-cwSykgJ06B5P5_Hc6kYwH9W8UCF7Gsiiy1PXDve9t5RyGS_mXlXBXQHOsJgcb0FeioZfRGTJC0SPohYC3xf1Nwlk__xr44brDhhAmp8Mbl8ohK2T0P4ZtrBnmWanCYDgUApM25z8pnPg5tjs9tlw";
const key2 =
  "PHOTO_CACHE:places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNTo4diwgRzqc3zgjQL4aHy5iaM8l1BJMm-FQpsgSTWMGP7W1IXULHBunMhiCg54YvpX5N2G_SWbf9zH488ZXsR_uRYvT8CrteMHZlB0HlfgkQfJUlJ4mO8uGd-zUjK_wokJo8e3gK4sxyez4yEghYAVopUdxMhZy5telRgoSGupI8eFlgz5x7ubU0fAZePOTXkD2u2Js10FVTC3ikJXT2btFE943RohdCEwJ2UE6t9L6y4W3TQfAn9uI7-TecqsDJQPyGz0YIzOgk2yEJOWojSrBlDo7__qqlHBOuhbLCy2hHSIN3w0yHTWTuFDCJT0P5d9hPfjc8jUZQ-BDBqvLYPDyZ-8wBkc2bwp2oViqzjRUM_QjNz4pnxoRrL6ufkK_sinlooG14IrQiwCUaCwkCWRdy3XClR7jaCFyqyDLDWnl_ye";
const name2 =
  "places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNTo4diwgRzqc3zgjQL4aHy5iaM8l1BJMm-FQpsgSTWMGP7W1IXULHBunMhiCg54YvpX5N2G_SWbf9zH488ZXsR_uRYvT8CrteMHZlB0HlfgkQfJUlJ4mO8uGd-zUjK_wokJo8e3gK4sxyez4yEghYAVopUdxMhZy5telRgoSGupI8eFlgz5x7ubU0fAZePOTXkD2u2Js10FVTC3ikJXT2btFE943RohdCEwJ2UE6t9L6y4W3TQfAn9uI7-TecqsDJQPyGz0YIzOgk2yEJOWojSrBlDo7__qqlHBOuhbLCy2hHSIN3w0yHTWTuFDCJT0P5d9hPfjc8jUZQ-BDBqvLYPDyZ-8wBkc2bwp2oViqzjRUM_QjNz4pnxoRrL6ufkK_sinlooG14IrQiwCUaCwkCWRdy3XClR7jaCFyqyDLDWnl_ye";
const key3 =
  "PHOTO_CACHE:places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNRFjNuhV-sXyi_RKoIaVILz0YTpJ8P2sA3_OybVtoRlKoKxuPPzqZa1_XVUpDKSsEeyv8VNoHif_kbR-zWf70vNBkGzaqiGvA7AGwsjHKmOmg5Y3L0cdVo1D9brMyoVuXVIoDJfEgEwz05SdSoa-4FOKMIX94lau9B1X6huHKcsclTmIvsb3ppLBPJraBkGmPQ9dYlQQkyJzvPTZBTLHEMT_hM-yQZYVyxXLkRnENQ4IUtEDSDFSMowACRclCR35p23zV56S4MCOmUAdI89j7IKvJA4c-CgMFjP9Ff3mtxKkRnnEyRBlImNpIEce6E5PGNuabgVg-v5ortvT-YMdros2YP2M8nDU3g0lN1RpcpeFtEHdycukQUAd1-ky1akqW70NQImAAEWp3cr3RD8tWaejXdPlDfN7W7LM9ibgIM";
const name3 =
  "places/ChIJofhTf5v2skARFpsNDro3cxE/photos/AXQCQNRFjNuhV-sXyi_RKoIaVILz0YTpJ8P2sA3_OybVtoRlKoKxuPPzqZa1_XVUpDKSsEeyv8VNoHif_kbR-zWf70vNBkGzaqiGvA7AGwsjHKmOmg5Y3L0cdVo1D9brMyoVuXVIoDJfEgEwz05SdSoa-4FOKMIX94lau9B1X6huHKcsclTmIvsb3ppLBPJraBkGmPQ9dYlQQkyJzvPTZBTLHEMT_hM-yQZYVyxXLkRnENQ4IUtEDSDFSMowACRclCR35p23zV56S4MCOmUAdI89j7IKvJA4c-CgMFjP9Ff3mtxKkRnnEyRBlImNpIEce6E5PGNuabgVg-v5ortvT-YMdros2YP2M8nDU3g0lN1RpcpeFtEHdycukQUAd1-ky1akqW70NQImAAEWp3cr3RD8tWaejXdPlDfN7W7LM9ibgIM";
const testKey1 = async () => {
  console.log("=== Test 1 ===");
  console.log("Cheie brută:", key1);
  try {
    const raw = await AsyncStorage.getItem(key1);
    console.log("getItem:", raw);
  } catch (e) {
    console.error("🔥 AsyncStorage.getItem error:", e);
  }
  try {
    const v = await getCachedUrl(key1.replace("PHOTO_CACHE:", ""));
    console.log("getCachedUrl:", v);
  } catch (e) {
    console.error("🔥 getCachedUrl error:", e);
  }
};

// 2)
const testKey2 = async () => {
  console.log("=== Test 2 ===");
  console.log("Cheie brută:", key2);
  try {
    const raw = await AsyncStorage.getItem(key2);
    console.log("getItem:", raw);
  } catch (e) {
    console.error("🔥 AsyncStorage.getItem error:", e);
  }
  try {
    const v = await getCachedUrl(key2.replace("PHOTO_CACHE:", ""));
    console.log("getCachedUrl:", v);
  } catch (e) {
    console.error("🔥 getCachedUrl error:", e);
  }
};

// 3)
const testKey3 = async () => {
  console.log("=== Test 3 ===");
  console.log("Cheie brută:", key3);
  try {
    const raw = await AsyncStorage.getItem(key3);
    console.log("getItem:", raw);
  } catch (e) {
    console.error("🔥 AsyncStorage.getItem error:", e);
  }
  try {
    const v = await getCachedUrl(key3.replace("PHOTO_CACHE:", ""));
    console.log("getCachedUrl:", v);
  } catch (e) {
    console.error("🔥 getCachedUrl error:", e);
  }
};
export default function usePhotoCache({ photos }) {
  const [urls, setUrls] = useState(null);
  const { startWRefresh } = useApiWithRefresh();

  useEffect(() => {
    let canceled = false;
    async function resolveAllPhotos() {
      await test();
      console.log("photos len:", photos.length);
      console.log("am inceput");
      const fromCache = await Promise.all(
        photos.map((name) => getCachedUrl(name))
      );
      if (!canceled) setUrls(fromCache);
      console.log("am fromchache", fromCache);
      const toResolve = fromCache
        .map((url, idx) => (url ? null : { idx, name: photos[idx] }))
        .filter(Boolean);
      console.log("am toRESOLVE:", toResolve.length);

      if (toResolve.length > 0) {
        console.log("sunt aiiici");
        const names = toResolve.map((item) => item.name);
        const resolved_urls = await startWRefresh(resolve_photos, names);
        new_urls = await resolved_urls.json();
        console.log("am urls");
        const writeToCache = new_urls.map((url, idx) => {
          return setCachedUrl(names[idx], url);
        });
        await Promise.all(writeToCache);
      }
      const finalCache = await Promise.all(photos.map(getCachedUrl));
      if (!canceled) setUrls(finalCache);
    }
    resolveAllPhotos();

    async function run() {
      const keys = await AsyncStorage.getAllKeys();
      console.log("🔑 Toate cheile la intrare:", keys);
      await testKey1();
      await testKey2();
      await testKey3();
    }

    return () => {
      canceled = true;
    };
  }, [photos]);
  return urls;
}

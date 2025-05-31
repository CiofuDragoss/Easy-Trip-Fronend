import { useState, useRef, useCallback, useContext } from "react";
import { refresh } from "@/utils/api";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@/context/AuthContext";
import { checkToken } from "@/utils/api";
export function useApiWithRefresh() {
  const { logOut, setUserToken, userToken } = useContext(AuthContext);
  const startWRefresh = useCallback(
    async (apiFunc, ...args) => {
      console.log("salutt");
      let response = await apiFunc(userToken, ...args);
      if (response.status === 401 || response.status === 403) {
        try {
          const refreshToken = await SecureStore.getItemAsync("refresh_token");
          if (!refreshToken) {
            throw new Error("No refresh token found");
          }
          const refreshResponse = await refresh(refreshToken);
          if (!refreshResponse.ok) {
            throw new Error("Failed to refresh token");
          }
          const { access_token, refresh_token: newRefresh_token } =
            await refreshResponse.json();
          await SecureStore.setItemAsync("refresh_token", newRefresh_token);
          setUserToken(access_token);
          response = await apiFunc(access_token, ...args);
        } catch (error) {
          console.log("am eroare");
          console.log("eroare:", error.message);
          logOut();
          throw error;
        }
      }
      return response;
    },
    [logOut, setUserToken, userToken]
  );
  const startWSRefresh = useCallback(
    async (url, configure) => {
      const check = await startWRefresh(checkToken, userToken);
      const ws = new WebSocket(url, null, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      configure(ws);

      return ws;
    },
    [startWRefresh, userToken]
  );
  return { startWRefresh, startWSRefresh };
}

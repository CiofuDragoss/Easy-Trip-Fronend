import { useState, useRef, useCallback, useContext } from "react";
import { refresh } from "@/utils/api";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@/context/AuthContext";
export function useApiWithRefresh() {
  const { logOut, setUserToken, userToken } = useContext(AuthContext);

  const startWRefresh = useCallback(
    async (apiFunc, ...args) => {
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
          logOut();
          throw error;
        }
      }
      return response;
    },
    [logOut, setUserToken, userToken]
  );

  return { startWRefresh };
}

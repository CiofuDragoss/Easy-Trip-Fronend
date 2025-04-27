import React, { Children, createContext, useEffect, useState } from "react";
import routes from "@/constants/routes";
import * as SecureStore from "expo-secure-store";

import { refresh } from "@/utils/api";
export const AuthContext = createContext();

const base_url = routes.backend_base;
export const AuthProvider = ({ children }) => {
  const [LogPanel, setPanel] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    setAuthError(null);
  }, [LogPanel]);
  useEffect(() => {
    const checkLogged = async () => {
      try {
        console.log("verific tokenul");
        const refresh_token = await SecureStore.getItemAsync("refresh_token");
        console.log("refresh token: ", refresh_token);
        if (!refresh_token) {
          setUserToken(null);
          return;
        }
        const response = await refresh(refresh_token);
        if (!response.ok) {
          console.log("nu e ok");
          setUserToken(null);
          return;
        } else {
          console.log("e ok");
          const username = await SecureStore.getItemAsync("username");
          const email = await SecureStore.getItemAsync("email");
          setUsername(username);
          setEmail(email);
          const { access_token, refresh_token: new_refresh } =
            await response.json();
          await SecureStore.setItemAsync("refresh_token", new_refresh);
          console.log("tokenul este: ", access_token);
          setUserToken(access_token);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkLogged();
  }, []);
  const signup = async ({ username, email, password }) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch(base_url + "/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        error = await res.json();
        throw new Error(error.detail);
      }
      const { access_token, refresh_token } = await res.json();
      await SecureStore.setItemAsync("refresh_token", refresh_token);
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("email", username);
      setUsername(username);
      setEmail(email);
      setUserToken(access_token);
    } catch (err) {
      setAuthError(err);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setAuthError(null);
    console.log("saluttt");
    try {
      const res = await fetch(base_url + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(res.ok);
      if (!res.ok) {
        error = await res.json();
        throw new Error(error.detail);
      }

      const {
        access_token,
        refresh_token: new_refresh,
        username,
      } = await res.json();
      await SecureStore.setItemAsync("refresh_token", new_refresh);
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("username", username);

      setEmail(email);
      setUsername(username);
      setUserToken(access_token);
    } catch (err) {
      setAuthError(err);
      console.log("asta e erorr: ", err);
    } finally {
      setIsLoading(false);
    }
  };
  const logOut = async () => {
    await SecureStore.deleteItemAsync("refresh_token");
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        isLoading,
        authError,
        setAuthError,
        userToken,
        signup,
        LogPanel,
        setPanel,
        email,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

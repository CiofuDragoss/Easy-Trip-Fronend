import React, { Children, createContext, useEffect, useState } from "react";
import routes from "@/constants/routes";
import * as SecureStore from "expo-secure-store";
export const AuthContext = createContext();

const base_url = routes.backend_base;
export const AuthProvider = ({ children }) => {
  const [LogPanel, setPanel] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setAuthError(null);
  }, [LogPanel]);
  useEffect(() => {
    const checkLogged = async () => {
      try {
        console.log("verific tokenul");
        const token = await SecureStore.getItemAsync("access_token");
        const email = await SecureStore.getItemAsync("email");
        if (email) setEmail(email);
        if (token) setUserToken(token);
      } catch (error) {
        console.error("Error reading token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogged();
  }, []);
  const signup = async ({ username, name, email, password }) => {
    console.log("Hello!");
    setIsLoading(true);
    setAuthError(null);
    console.log(username);
    console.log(name);
    console.log(email);
    console.log(password);
    try {
      const res = await fetch(base_url + "/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, email, password }),
      });
      if (!res.ok) {
        error = await res.json();
        throw new Error(error.detail);
      }
      const { access_token } = await res.json();
      await SecureStore.setItemAsync("access_token", access_token);
      await SecureStore.setItemAsync("email", email);
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

      const { access_token } = await res.json();
      await SecureStore.setItemAsync("access_token", access_token);
      await SecureStore.setItemAsync("email", email);
      setEmail(email);
      setUserToken(access_token);
    } catch (err) {
      setAuthError(err);
      console.log("asta e erorr: ", err);
    } finally {
      setIsLoading(false);
    }
  };
  const logOut = async () => {
    await SecureStore.deleteItemAsync("access_token");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

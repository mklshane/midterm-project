import React, { createContext, useContext, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState("isLoggedIn", false);
  const [userName, setUserName] = usePersistedState("userName", "");
  const { addToast } = useToast();

  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    addToast(`Welcome back, ${name}!`, "success");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    addToast("Logged out successfully", "info");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

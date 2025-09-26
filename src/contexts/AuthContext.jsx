import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userName, setUserName] = useLocalStorage("userName", "");
  const { addToast } = useToast();

  // handles user login
  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    addToast(`Welcome back, ${name}!`, "success");
  };

  // handles user logout
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

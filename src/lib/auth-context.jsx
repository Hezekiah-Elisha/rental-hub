"use client";
import { getCookie } from "@/app/lib/session";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access_token, setAccessToken] = useState(null); // Fixed typo

  // Check cookie on mount
  useEffect(() => {
    getCookie("access_token")
      .then((token) => {
        setAccessToken(token || null);
      })
      .catch((error) => {
        console.error("Failed to get access_token:", error);
        setAccessToken(null);
      });
  }, []);

  // Function to manually refresh token from cookie
  const refreshToken = () => {
    getCookie("access_token")
      .then((token) => {
        setAccessToken(token || null);
      })
      .catch((error) => {
        console.error("Refresh token error:", error);
        setAccessToken(null);
      });
  };

  // Logout clears the state (cookie handled elsewhere)
  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ access_token, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
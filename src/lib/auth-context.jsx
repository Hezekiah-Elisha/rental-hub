"use client";
import { getCookie } from "@/app/lib/session";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access_token, setAccessToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCookie("access_token")
      .then((access_token) => {
        setAccessToken(access_token || null);
      })
      .catch((error) => {
        console.error(error);
        setAccessToken(null);
      });
    // setLoading(false);
  }, []);

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

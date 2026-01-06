import React, { createContext, useState } from "react";
import { login as loginAPI } from "../api/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refresh_token")
  );

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginAPI(email, password);
      const { access_token, refresh_token, user } = res.data;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setUser(user);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      return { ok: true, user };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err.message || "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

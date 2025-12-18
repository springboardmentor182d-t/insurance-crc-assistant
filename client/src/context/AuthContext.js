import React, { createContext, useState } from 'react';
import { login as loginAPI, refreshToken as refreshAPI } from '../api/authService';
// For demo without backend, swap to mockAuthService:
// import { login as loginAPI, refreshToken as refreshAPI } from '../api/mockAuthService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginAPI(email, password);
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      setUser(res.user);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      setLoading(false);
      return { ok: true, user: res.user };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

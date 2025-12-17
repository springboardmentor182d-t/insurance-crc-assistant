// src/api/authService.js
import axios from "axios";

/* ================= API INSTANCE ================= */
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true
});

/* Automatically attach token */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= AUTH ================= */

export const register = (data) =>
  API.post("/api/auth/register", data);

// LOGIN (OAuth2 form)
export const login = (email, password) =>
  API.post(
    "/api/auth/login",
    new URLSearchParams({
      username: email,
      password: password,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

export const getMe = async () => {
  return API.get("/api/auth/me");
};

/* ================= OTP ================= */

// src/api/authService.js

export const forgotPassword = async (email) => {
  return API.post("/api/auth/forgot-password", { email });
};

export const verifyOtp = async (email, code) => {
  return API.post("/api/auth/verify-otp", { email, code });
};

export const resetPassword = async (email, password) => {
  return API.post("/api/auth/reset-password", {
    email,
    new_password: password,
  });
};


/* ================= LOGOUT ================= */

export const logout = () => {
  localStorage.removeItem("access_token");
};

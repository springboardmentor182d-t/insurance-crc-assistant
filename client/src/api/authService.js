import axios from "axios";

/* ================= API INSTANCE ================= */
const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: API_BASE,
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

export const getMe = () => API.get("/api/auth/me");

/* ================= OTP ================= */

export const forgotPassword = (email) =>
  API.post("/api/auth/forgot-password", { email });

export const verifyOtp = (email, code) =>
  API.post("/api/auth/verify-otp", { email, code });

export const resetPassword = (email, password) =>
  API.post("/api/auth/reset-password", {
    email,
    new_password: password,
  });

/* ================= LOGOUT ================= */

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
};

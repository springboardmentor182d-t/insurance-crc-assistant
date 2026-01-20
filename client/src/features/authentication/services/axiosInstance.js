// client/src/features/authentication/services/axiosInstance.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // your FastAPI base
  withCredentials: true,
});

// Attach JWT token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";
/* ======================
   AXIOS INSTANCE
====================== */
const API = axios.create({
  baseURL: API_BASE,
});

/* ======================
   ATTACH JWT TOKEN
====================== */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ======================
   GET ALL CLAIMS (LIST)
====================== */
export const getClaims = async () => {
  try {
    const res = await API.get("/claims/list");
    return res.data;
  } catch (error) {
    console.error("Error fetching claims:", error);
    return []; // prevent UI crash
  }
};

/* ======================
   GET CLAIM DETAILS
====================== */
export const getClaimDetails = async (claimNumber) => {
  try {
    const res = await API.get(`/claims/${claimNumber}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // important for UI
    }
    throw error;
  }
};

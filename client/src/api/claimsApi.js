import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE) {
  console.error("API_BASE_URL is undefined. Check .env file");
}

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
    return [];
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
      return null;
    }
    throw error;
  }
};

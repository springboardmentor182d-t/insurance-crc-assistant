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

// 🔹 Submit incident details (future use)
export const submitClaim = async (data) => {
  const res = await fetch(`${API_BASE}/claims/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit claim");
  return res.json();
};

// 🔹 Upload documents
export const uploadDocuments = async ({ claimId, files }) => {
  const formData = new FormData();
  formData.append("claim_id", claimId);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch(`${API_BASE}/claims/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

// 🔹 GET POLICIES
export const getPolicies = async () => {
  try {
    const res = await API.get("/claims/policies");
    return res.data;
  } catch (error) {
    console.error("Error fetching policies:", error);
    return [];
  }
};

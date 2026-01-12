import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";
/* ======================
   GET ALL CLAIMS
====================== */
export const getClaims = async () => {
  const res = await axios.get(`${API_BASE}/claims/list`);
  return res.data;
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
      return null;
    }
    throw error;
  }
};

/* ======================
   SUBMIT CLAIM
====================== */
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

/* ======================
   UPLOAD DOCUMENT (FIXED)
====================== */
export const uploadDocuments = async (claimId, file) => {
  const formData = new FormData();
  formData.append("claim_id",String(claimId));
  formData.append("file", file); // ✅ correct key

  const res = await fetch(`${API_BASE}/claims/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

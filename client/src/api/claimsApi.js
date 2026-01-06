import axios from "axios";

const API_BASE = "http:////127.0.0.1:8000";

/* ======================
   GET ALL CLAIMS (LIST)
====================== */
export const getClaims = async () => {
  const res = await axios.get(`${API_BASE}/claims/`);
  return res.data;
};

/* ======================
   GET CLAIM DETAILS
====================== */
export const getClaimDetails = async (claimNumber) => {
  try {
    const res = await axios.get(`${API_BASE}/claims/${claimNumber}`);
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

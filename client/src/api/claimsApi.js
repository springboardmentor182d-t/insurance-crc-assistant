import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

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

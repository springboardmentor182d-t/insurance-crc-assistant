import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: API_BASE,
});


/* ======================
   FRAUD DASHBOARD
====================== */
export const getFraudDashboard = async () => {
  const res = await axios.get(`${API_BASE}/fraud/dashboard`);
  return res.data;
};

/* ======================
   FRAUD CLAIM DETAILS
====================== */
export const getFraudClaimDetails = async (claimId) => {
  try {
    const res = await axios.get(`${API_BASE}/fraud/claim/${claimId}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // important for UI
    }
    throw error;
  }
};

/* ======================
   FRAUD ACTIONS
====================== */
export const markClaimSafe = async (claimId) => {
  const res = await axios.post(
    `${API_BASE}/fraud/claim/${claimId}/mark-safe`
  );
  return res.data;
};

export const rejectClaim = async (claimId) => {
  const res = await axios.post(
    `${API_BASE}/fraud/claim/${claimId}/reject`
  );
  return res.data;
};

export const requestMoreInfo = async (claimId) => {
  const res = await axios.post(
    `${API_BASE}/fraud/claim/${claimId}/request-info`
  );
  return res.data;
};

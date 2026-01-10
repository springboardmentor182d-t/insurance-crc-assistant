import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

/* ======================
   GET ALL POLICIES
====================== */
export const getPolicies = async (category = null) => {
  const url = category
    ? `${API_BASE}/policies?category=${category}`
    : `${API_BASE}/policies`;

  const res = await axios.get(url);
  return res.data;
};


/* ======================
   GET POLICY BY ID
====================== */
export const getPolicyById = async (id) => {
  const res = await axios.get(`${API_BASE}/policies/${id}`);
  return res.data;
};

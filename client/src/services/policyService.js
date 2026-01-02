import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const fetchPolicies = async (category = "All") => {
  const response = await axios.get(`${API_BASE_URL}/policies`, {
    params: category !== "All" ? { category } : {}
  });
  return response.data;
};

export const fetchPolicyById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/policies/${id}`);
  return response.data;
};

/* ✅ ADD THIS */
export const fetchComparedPolicies = async (policyIds) => {
  const params = new URLSearchParams();
  policyIds.forEach((id) => params.append("ids", id));

  const response = await axios.get(
    `${API_BASE_URL}/policies/compare?${params.toString()}`
  );

  return response.data;
};

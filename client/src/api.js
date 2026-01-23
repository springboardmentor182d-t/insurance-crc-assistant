import axios from "axios";

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
});


/**
 * Attach JWT token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   MY POLICIES (ACTIVE POLICIES)
   ===================================================== */

/**
 * Get all active policies for logged-in user
 * GET /policies
 */
export const fetchPolicies = () => {
  return api.get("/policies");
};

/**
 * Add new policy
 * POST /policies
 */
export const addPolicy = (data) => {
  return api.post("/policies", data);
};

/**
 * Update existing policy
 * PUT /policies/{policy_id}
 */
export const updatePolicy = (policyId, data) => {
  return api.put(`/policies/${policyId}`, data);
};

/**
 * Delete policy
 * DELETE /policies/{policy_id}
 */
export const deletePolicy = (policyId) => {
  return api.delete(`/policies/${policyId}`);
};

export default api;

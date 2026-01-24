import api from "../api";
import { useProfile } from "../context/ProfileContext";

/* =====================================================
   CUSTOM HOOK
===================================================== */

export const useAdminApi = () => {
  // token is already handled by axios interceptor
  return api;
};

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const getFraudSummary = async (apiInstance) => {
  const res = await apiInstance.get("/api/admin/dashboard/summary");
  return res.data;
};

export const exportFraudCSV = async (apiInstance) => {
  const res = await apiInstance.get("/api/admin/dashboard/export", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "fraud_dashboard.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/* =====================================================
   FLAGGED CLAIMS
===================================================== */

export const getFlaggedClaims = async (apiInstance, params = {}) => {
  const res = await apiInstance.get("/api/admin/flagged-claims", { params });
  return res.data;
};

export const getFlaggedClaimDetail = async (apiInstance, claimId) => {
  const res = await apiInstance.get(
    `/api/admin/flagged-claims/${claimId}`
  );
  return res.data;
};

export const approveFlaggedClaim = async (apiInstance, claimId) => {
  const res = await apiInstance.post(
    `/api/admin/flagged-claims/${claimId}/approve`
  );
  return res.data;
};

export const denyFlaggedClaim = async (apiInstance, claimId) => {
  const res = await apiInstance.post(
    `/api/admin/flagged-claims/${claimId}/deny`
  );
  return res.data;
};

export const investigateFlaggedClaim = async (apiInstance, claimId) => {
  const res = await apiInstance.post(
    `/api/admin/flagged-claims/${claimId}/investigate`
  );
  return res.data;
};

/* =====================================================
   FRAUD RULES ENGINE
===================================================== */

/* =====================================================
   FRAUD RULES ENGINE
===================================================== */

export const getFraudRules = async (apiInstance) => {
  const res = await apiInstance.get("/api/admin/fraud-rules");
  return res.data;
};

export const toggleFraudRule = async (apiInstance, ruleId) => {
  const res = await apiInstance.post(
    `/api/admin/fraud-rules/${ruleId}/toggle`
  );
  return res.data;
};

export const deleteFraudRule = async (apiInstance, id) => {
  const res = await apiInstance.delete(
    `/api/admin/fraud-rules/${id}`
  );
  return res.data;
};

// GET SINGLE FRAUD RULE
export const getFraudRuleById = async (apiInstance, id) => {
  const res = await apiInstance.get(`/api/admin/fraud-rules/${id}`);
  return res.data;
};

// UPDATE FRAUD RULE
export const updateFraudRule = async (apiInstance, id, payload) => {
  const res = await apiInstance.put(`/api/admin/fraud-rules/${id}`, payload);
  return res.data;
};

export const createFraudRule = async (apiInstance, payload) => {
  const res = await apiInstance.post(
    "/api/admin/fraud-rules",
    payload
  );
  return res.data;
};


/* =====================================================
   INVESTIGATIONS
===================================================== */


export const getInvestigations = async (apiInstance) => {
  const res = await apiInstance.get("/api/admin/investigations/");
  return res.data;
};

export const updateInvestigation = async (apiInstance, id, payload) => {
  const res = await apiInstance.put(
    `/api/admin/investigations/${id}`,
    payload
  );
  return res.data;
};

export const deleteInvestigation = async (apiInstance, id) => {
  const res = await apiInstance.delete(
    `/api/admin/investigations/${id}`
  );
  return res.data;
};

export const getAdminPolicies = async (type = "all") => {
  const res = await api.get("/admin/policies", {
    params: { policy_type: type }
  });
  return res.data;
};


export const getPolicyById = async (type, id) => {
  const res = await api.get(`/admin/policies/${type}/${id}`);
  return res.data;
};

export const updatePolicy = async (type, id, payload) => {
  const res = await api.put(`/admin/policies/${type}/${id}`, payload);
  return res.data;
};

export const deletePolicy = async (type, id) => {
  const res = await api.delete(`/admin/policies/${type}/${id}`);
  return res.data;
};

export const createPolicy = async (type, payload) => {
  const res = await api.post(`/admin/policies/${type}`, payload);
  return res.data;
};




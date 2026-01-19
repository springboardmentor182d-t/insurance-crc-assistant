import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getProfile = () => axios.get(`${API}/profile`);
export const updateProfile = (data) => axios.put(`${API}/profile`, data);

export const getPreferences = () => axios.get(`${API}/preferences`);
export const updatePreferences = (data) =>
  axios.put(`${API}/preferences`, data);

export const getRecommendations = () => axios.get(`${API}/recommendations`);

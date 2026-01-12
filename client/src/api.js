import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // keep this correct
});

// Fetch user profile by ID
export const fetchProfile = async (id) => {
  if (!id) {
    console.error("fetchProfile called without an ID");
    return null; // prevent broken URL calls
  }
  try {
    const response = await api.get(`/api/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

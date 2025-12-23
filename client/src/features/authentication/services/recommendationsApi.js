import axios from "axios";

export const fetchRecommendations = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:8000/api/recommendations", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
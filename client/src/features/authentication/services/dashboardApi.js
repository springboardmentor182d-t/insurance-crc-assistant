import axios from "axios";

export const fetchDashboardData = async (userId) => {
  const token = localStorage.getItem("token"); // ensure your login flow sets this
  const res = await axios.get(`http://localhost:8000/dashboard/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
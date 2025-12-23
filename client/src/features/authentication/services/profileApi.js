import axios from "axios";

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:8000/api/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveProfile = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post("http://localhost:8000/api/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
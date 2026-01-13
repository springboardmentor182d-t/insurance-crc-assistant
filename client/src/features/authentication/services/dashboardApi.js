const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

export async function fetchDashboardData(userId) {
  const res = await fetch(`${BASE_URL}/dashboard/user/${userId}`);
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

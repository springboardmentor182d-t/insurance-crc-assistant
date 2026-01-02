const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchDashboardData(userId) {
  if (!BASE_URL) {
    console.error("BASE_URL is undefined");
  }

  const res = await fetch(`${BASE_URL}/dashboard/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

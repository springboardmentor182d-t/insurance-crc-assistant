export async function fetchDashboardData(userId) {
  const res = await fetch(`http://127.0.0.1:8000/dashboard/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}
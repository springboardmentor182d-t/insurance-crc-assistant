const BASE_URL = "http://127.0.0.1:8000";

export async function getRecommendations() {
  const res = await fetch(`${BASE_URL}/recommendations`);
  return res.json();
}

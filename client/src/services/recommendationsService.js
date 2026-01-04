const BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log("BASE_URL from env:", BASE_URL);
export async function getRecommendations() {
  const res = await fetch(`${BASE_URL}/recommendations`);
  return res.json();
}

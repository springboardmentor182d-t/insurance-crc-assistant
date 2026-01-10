const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

console.log("BASE_URL from env:", BASE_URL);

/**
 * Get all recommendations
 * Used in Recommendations list page
 */
export async function getRecommendations() {
  const res = await fetch(`${BASE_URL}/recommendations`);

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
}

/**
 * Get single recommendation for View Details page
 */
export async function getRecommendationById(id) {
  const res = await fetch(`${BASE_URL}/recommendations/${id}/view`);

  if (!res.ok) {
    throw new Error("Failed to fetch recommendation details");
  }

  return res.json();
}

/**
 * Save recommendation for later
 * (optional – keep only if backend supports it)
 */
export async function saveRecommendation(id) {
  const res = await fetch(`${BASE_URL}/recommendations/${id}/save`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to save recommendation");
  }

  return res.json();
}

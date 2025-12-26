const BASE_URL = "http://127.0.0.1:8000";

export async function fetchProfile() {
  const res = await fetch(`${BASE_URL}/profile`);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export async function saveProfile(profile) {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    throw new Error("Failed to save profile");
  }
  return res.json();
}

export async function fetchQuickStats() {
  const res = await fetch(`${BASE_URL}/profile/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

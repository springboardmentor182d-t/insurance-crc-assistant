const BASE_URL = "http://127.0.0.1:8000";

export async function getPreferences() {
  const res = await fetch(`${BASE_URL}/preferences`);
  return res.json();
}

export async function savePreferences(data) {
  const res = await fetch(`${BASE_URL}/preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

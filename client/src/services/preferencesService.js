const BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log("BASE_URL from env:", BASE_URL);

export async function getInsuranceTypes() {
  const res = await fetch(`${BASE_URL}/preferences/insurance-types`);
  if (!res.ok) throw new Error("Failed to load insurance types");
  return res.json();
}

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

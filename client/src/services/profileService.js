const BASE_URL = "http://127.0.0.1:8000";

export async function fetchProfile() {
  const res = await fetch(`${BASE_URL}/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function saveProfile(profile) {
  const payload = {
    full_name: profile.full_name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    dob: profile.dob ? profile.dob : null,   // IMPORTANT
    address: profile.address || "",
  };

  const res = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Save profile error:", errorText);
    throw new Error("Failed to save profile");
  }

  return res.json();
}

const BASE_URL = "http://127.0.0.1:8000";

// 🔹 Submit incident details (future use)
export const submitClaim = async (data) => {
  const res = await fetch(`${BASE_URL}/claims/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit claim");
  return res.json();
};

// 🔹 Upload documents
export const uploadDocuments = async ({ claimId, files }) => {
  const formData = new FormData();
  formData.append("claim_id", claimId);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch(`${BASE_URL}/claims/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

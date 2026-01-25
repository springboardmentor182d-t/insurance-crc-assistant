import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const FileNewClaimStep2 = () => {
  const navigate = useNavigate();
  const claimId = localStorage.getItem("claim_id");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    if (!claimId) {
      alert("Claim ID not found. Please start again.");
      navigate("/claims/file/step1");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${baseURL}/claims/${claimId}/documents`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      setUploaded(true);
      alert("Document uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Error uploading document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-8 py-10
                 bg-[var(--bg-main)] text-[var(--text-main)]"
    >
      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          File New Claim
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Step 2 of 3 · Upload documents
        </p>
      </div>

      {/* CARD */}
      <div
        className="max-w-3xl mx-auto
                   bg-[var(--bg-card)]
                   border border-[var(--border)]
                   rounded-2xl p-6 sm:p-8 space-y-8"
      >
        {/* UPLOAD AREA */}
        <div>
          <label className="text-sm font-medium block mb-3">
            Upload Supporting Document
          </label>

          <div
            className="border-2 border-dashed border-[var(--border)]
                       rounded-xl p-6 text-center
                       bg-[var(--bg-main)]"
          >
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="
                block w-full text-sm
                text-[var(--text-muted)]
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-[var(--bg-card)]
                file:text-[var(--accent)]
                hover:file:opacity-90
                cursor-pointer
              "
            />

            <p className="text-xs text-[var(--text-muted)] mt-2">
              Accepted formats: PDF, JPG, PNG
            </p>
          </div>
        </div>

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full px-6 py-3 bg-indigo-600 rounded-lg text-white font-medium transition
            ${
              uploading
                ? "bg-[var(--border)] cursor-not-allowed"
                : "bg-[var(--accent)] hover:opacity-90"
            }`}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        {/* STATUS */}
        {uploaded && (
          <div className="flex items-center gap-2 text-emerald-600 text-sm">
            <span className="text-lg">✔</span>
            Document uploaded successfully
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="px-6 py-2.5 rounded-lg
                       border border-[var(--border)]
                       text-[var(--text-muted)]
                       hover:bg-[var(--bg-main)] transition"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate(`/claims/${claimId}/review`)}
            disabled={!uploaded}
            className={`px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium transition
              ${
                uploaded
                  ? "bg-[var(--accent)] hover:opacity-90"
                  : "bg-[var(--border)] cursor-not-allowed"
              }`}
          >
            Next: Review →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileNewClaimStep2;

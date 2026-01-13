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
        `${ baseURL}/claims/${claimId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        File New Claim – Step 2
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* Upload Section */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Upload Supporting Document
          </label>

          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            className="block w-full text-sm"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-6 py-2 rounded text-white ${
            uploading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        {/* Status */}
        {uploaded && (
          <p className="text-green-600 text-sm">
            ✔ Document uploaded successfully
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="px-6 py-2 border rounded"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/claims/file/step3")}
            disabled={!uploaded}
            className={`px-6 py-2 rounded text-white ${
              uploaded
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
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




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ReviewClaimStep3 = () => {
  const navigate = useNavigate();
  const claimId = localStorage.getItem("claim_id");

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!claimId) {
      alert("Claim ID missing. Please start again.");
      navigate("/claims/file/step1");
      return;
    }

    const fetchClaim = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/${claimId}`);
        if (!res.ok) throw new Error("Failed to fetch claim");

        const data = await res.json();
        setClaim(data);
      } catch (err) {
        console.error(err);
        alert("Error loading claim details");
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [claimId, navigate]);

  const handleSubmit = () => {
    // For now, submission is logical (status already created)
    localStorage.removeItem("claim_id");
    navigate("/claims/submitted");
  };

  if (loading) {
    return <div className="p-6">Loading claim details...</div>;
  }

  if (!claim) {
    return <div className="p-6 text-red-600">Claim not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        Review & Submit – Step 3
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <strong>Policy:</strong> {claim.policy}
        </div>
        <div>
          <strong>Claim Type:</strong> {claim.claim_type}
        </div>
        <div>
          <strong>Incident Date:</strong> {claim.incident_date}
        </div>
        <div>
          <strong>Description:</strong> {claim.description}
        </div>
        <div>
          <strong>Amount Claimed:</strong> ₹{claim.amount_claimed}
        </div>
        <div>
          <strong>Status:</strong> {claim.status}
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate("/claims/file/step2")}
            className="px-6 py-2 border rounded"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Claim →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewClaimStep3;



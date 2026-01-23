import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api"; // ✅ USE AXIOS INSTANCE

const ReviewClaimStep3 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/claims");
      return;
    }

    const fetchClaim = async () => {
      try {
        const res = await api.get(`/claims/${id}`); // ✅ CORRECT
        setClaim(res.data);
      } catch (err) {
        console.error("Claim fetch failed:", err);

        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        } else {
          alert("Error loading claim details");
          navigate("/claims");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id, navigate]);

  const handleSubmit = async () => {
    try {
      await api.post(`/claims/${id}/submit`);
      localStorage.removeItem("claim_id");
      navigate("/claims/submitted");
    } catch (err) {
      alert("Error submitting claim");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading claim details…
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Claim not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Review & Submit Claim</h1>

      <div className="space-y-2 text-sm">
        <p><b>Policy:</b> {claim.user_policy?.policy_name}</p>
        <p><b>Claim Type:</b> {claim.claim_type}</p>
        <p><b>Incident Date:</b> {claim.incident_date}</p>
        <p><b>Amount:</b> ₹{claim.amount_claimed}</p>
        <p><b>Status:</b> {claim.status}</p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate(`/claims/${id}/documents`)}
          className="border px-5 py-2 rounded"
        >
          ← Back
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Submit Claim →
        </button>
      </div>
    </div>
  );
};

export default ReviewClaimStep3;

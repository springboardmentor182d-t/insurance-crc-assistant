import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

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
        const res = await api.get(`/claims/${id}`);
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

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center
                   bg-[var(--bg-main)] text-[var(--text-muted)]"
      >
        Loading claim details…
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (!claim) {
    return (
      <div
        className="min-h-screen flex items-center justify-center
                   bg-[var(--bg-main)] text-red-500"
      >
        Claim not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-8 py-12
                 bg-[var(--bg-main)] text-[var(--text-main)]"
    >
      <div
        className="max-w-3xl mx-auto
                   bg-[var(--bg-card)]
                   border border-[var(--border)]
                   rounded-2xl p-6 sm:p-8"
      >
        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          Review & Submit Claim
        </h1>

        {/* CLAIM DETAILS */}
        <div className="space-y-3 text-sm">
          <Detail
            label="Policy"
            value={claim.user_policy?.policy_name}
          />
          <Detail
            label="Claim Type"
            value={claim.claim_type}
          />
          <Detail
            label="Incident Date"
            value={claim.incident_date}
          />
          <Detail
            label="Amount"
            value={`₹${claim.amount_claimed}`}
          />
          <Detail
            label="Status"
            value={claim.status}
            capitalize
          />
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
          <button
            onClick={() => navigate(`/claims/${id}/documents`)}
            className="
              px-6 py-2.5 rounded-lg
              border border-[var(--border)]
              text-[var(--text-muted)]
              hover:bg-[var(--bg-main)]
              transition
            "
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-6 py-2.5 rounded-lg
              bg-indigo-600 text-white font-semibold
              hover:opacity-90 transition
            "
          >
            Submit Claim →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewClaimStep3;

/* ================= HELPERS ================= */

function Detail({ label, value, capitalize }) {
  return (
    <p className="flex justify-between gap-4">
      <span className="text-[var(--text-muted)] font-medium">
        {label}:
      </span>
      <span className={capitalize ? "capitalize" : ""}>
        {value ?? "—"}
      </span>
    </p>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

const ClaimSubmission = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl">
            ✓
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Claim Submitted Successfully
        </h1>

        <p className="text-sm text-[var(--text-muted)] mb-6">
          Your claim has been submitted. Our team will review it and update you
          shortly.
        </p>

        {/* Info */}
        <div className="border border-[var(--border)] rounded-lg p-4 mb-6 bg-[var(--bg-main)]">
          <p className="text-xs text-[var(--text-muted)]">STATUS</p>
          <p className="font-medium text-emerald-600">
            Under Review
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/claims/status")}
            className="px-6 py-2 rounded bg-indigo-600 text-white hover:opacity-90 transition"
          >
            View Claim Status
          </button>

          <button
            onClick={() => navigate("/claims")}
            className="px-6 py-2 rounded border border-[var(--border)] hover:bg-[var(--bg-main)] transition"
          >
            Back to Dashboard
          </button>
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-6">
          You will receive email updates about your claim.
        </p>
      </div>
    </div>
  );
};

export default ClaimSubmission;

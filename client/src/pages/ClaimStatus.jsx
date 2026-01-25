import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ClaimStatus = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch(`${baseURL}/claims`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch claims");
        const data = await res.json();
        setClaims(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        alert("Error loading claims");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] text-[var(--text-muted)]">
        Loading claims...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold">
            Claim Status
          </h1>
          <p className="text-[var(--text-muted)] mt-1">
            Track and manage your submitted claims
          </p>
        </div>

        <button
          onClick={() => navigate("/claims/file/step1")}
          className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition"
        >
          + File New Claim
        </button>
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="text-left px-6 py-4">Claim ID</th>
              <th className="text-left px-6 py-4">Policy</th>
              <th className="text-left px-6 py-4">Type</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {claims.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-[var(--text-muted)]"
                >
                  No claims found
                </td>
              </tr>
            )}

            {claims.map((claim) => (
              <tr
                key={claim.id}
                className="border-b border-[var(--border)] last:border-none hover:bg-[var(--bg-main)] transition"
              >
                <td className="px-6 py-4 font-medium">
                  #{claim.id}
                </td>

                <td className="px-6 py-4">
                  {claim.user_policy?.policy_name || "—"}
                </td>

                <td className="px-6 py-4">
                  {claim.claim_type}
                </td>

                <td className="px-6 py-4">
                  {claim.incident_date}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
                    {claim.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      navigate(`/claims/track/${claim.id}`)
                    }
                    className="text-[var(--accent)] hover:underline font-medium"
                  >
                    View / Track →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BACK */}
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/claims")}
          className="mt-8 text-[var(--accent)] hover:underline font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ClaimStatus;

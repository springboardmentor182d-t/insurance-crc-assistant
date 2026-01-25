import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ClaimsDashboard = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const draftClaim = claims.find((c) => c.status === "draft");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch claims");

        const data = await res.json();
        setClaims(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Claims fetch error:", err);
        setClaims([]);
      }
    };

    fetchClaims();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      draft: "bg-yellow-100 text-yellow-800",
      submitted: "bg-blue-100 text-blue-800",
      under_review: "bg-purple-100 text-purple-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          map[status] || "bg-slate-100"
        }`}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">
          Claims Dashboard
        </h1>
        <p className="text-[var(--text-muted)] mt-1">
          File, manage, and track your insurance claims
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-md transition">
          <h3 className="font-semibold mb-3">
            File New Claim
          </h3>
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="w-full bg-pink-600 hover:opacity-90 text-white px-4 py-2.5 rounded-lg transition"
          >
            Start Claim
          </button>
        </div>

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-md transition">
          <h3 className="font-semibold mb-3">
            Upload Documents
          </h3>
          <button
            onClick={() => {
              if (draftClaim) {
                navigate(`/claims/${draftClaim.id}/documents`);
              } else {
                navigate("/claims/file");
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition"
          >
            Upload Files
          </button>
        </div>

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-md transition">
          <h3 className="font-semibold mb-3">
            Review & Submit
          </h3>
          <button
            onClick={() => {
              if (draftClaim) {
                navigate(`/claims/${draftClaim.id}/review`);
              } else {
                navigate("/claims/file");
              }
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg transition"
          >
            Review Claim
          </button>
        </div>

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-md transition">
          <h3 className="font-semibold mb-3">
            Track Claim
          </h3>
          <button
            onClick={() => navigate("/claims")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition"
          >
            Track Status
          </button>
        </div>
      </div>

      {/* CLAIMS TABLE */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8">
        <h2 className="text-lg font-semibold mb-4">
          Recent Claims
        </h2>

        {claims.length === 0 ? (
          <div className="text-center py-10 text-[var(--text-muted)]">
            No claims found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-[var(--text-muted)]">
                  <th className="py-3">ID</th>
                  <th className="py-3">Policy</th>
                  <th className="py-3">Type</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--bg-main)]"
                  >
                    <td className="py-4 font-medium">#{claim.id}</td>
                    <td className="py-4">
                      {claim.user_policy?.policy_name || "—"}
                    </td>
                    <td className="py-4">{claim.claim_type}</td>
                    <td className="py-4">
                      {getStatusBadge(claim.status)}
                    </td>
                    <td className="py-4 text-right space-x-3">
                      {claim.status === "draft" && (
                        <>
                          <button
                            onClick={() =>
                              navigate(`/claims/${claim.id}/documents`)
                            }
                            className="text-blue-600 font-medium"
                          >
                            Upload
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/claims/${claim.id}/review`)
                            }
                            className="text-emerald-600 font-medium"
                          >
                            Review
                          </button>
                        </>
                      )}

                      <Link
                        to={`/claims/track/${claim.id}`}
                        className="text-[var(--accent)] font-medium"
                      >
                        Track →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimsDashboard;

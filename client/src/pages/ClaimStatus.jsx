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
        const res = await fetch(`${baseURL}/claims`);
        if (!res.ok) throw new Error("Failed to fetch claims");
        const data = await res.json();
        setClaims(data);
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
    return <div className="p-6">Loading claims...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Claim Status</h1>
        <button
          onClick={() => navigate("/claims/file/step1")}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          File New Claim
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">Claim ID</th>
              <th className="text-left p-3">Policy</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {claims.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No claims found
                </td>
              </tr>
            )}

            {claims.map((claim) => (
              <tr key={claim.id} className="border-b last:border-none">
                <td className="p-3">#{claim.id}</td>
                <td className="p-3">{claim.policy}</td>
                <td className="p-3">{claim.claim_type}</td>
                <td className="p-3">{claim.incident_date}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                    {claim.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/claims/track/${claim.id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View / Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate("/claims")}
        className="mt-6 text-purple-600"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default ClaimStatus;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const ClaimsDashboard = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/claims`)
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Claims Dashboard</h1>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">File New Claim</h3>
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Upload Documents</h3>
          <button
            onClick={() => navigate("/claims/file/step2")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Review & Submit</h3>
          <button
            onClick={() => navigate("/claims/review")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Review
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Track Claim</h3>
          <button
            onClick={() => navigate("/claims/status")}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            Track
          </button>
        </div>
      </div>

      {/* CLAIMS TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Recent Claims</h2>

        {claims.length === 0 ? (
          <p className="text-gray-500">No claims found</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Policy</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id} className="border-b">
                  <td>#{claim.id}</td>
                  <td>{claim.policy}</td>
                  <td>{claim.claim_type}</td>
                  <td>{claim.status}</td>
                  <td>
                    <Link
                      to={`/claims/${claim.id}`}
                      className="text-purple-600 hover:underline"
                    >
                      Track
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClaimsDashboard;


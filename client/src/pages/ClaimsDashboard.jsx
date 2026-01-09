import React from "react";
import { useNavigate } from "react-router-dom";

const ClaimsDashboard = () => {
  const navigate = useNavigate();

  // TEMP data (later this can come from backend)
  const recentClaims = [
    {
      id: 1,
      policy: "Health Insurance",
      type: "Hospitalization",
      status: "Under Review",
      date: "2025-02-08",
    },
    {
      id: 2,
      policy: "Travel Insurance",
      type: "Flight Delay",
      status: "Approved",
      date: "2025-01-22",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Claims Dashboard</h1>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* File New Claim */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">File New Claim</h3>
          <p className="text-sm text-gray-500 mb-4">
            Start a new insurance claim
          </p>
          <button
            onClick={() => navigate("/claims/file/step1")}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Start
          </button>
        </div>

        {/* Upload Documents */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">Upload Documents</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload claim related documents
          </p>
          <button
            onClick={() => navigate("/claims/file/step2")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>

        {/* Review & Submit */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">Review & Submit</h3>
          <p className="text-sm text-gray-500 mb-4">
            Review claim before submission
          </p>
          <button
            onClick={() => navigate("/claims/file/step3")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Review
          </button>
        </div>

        {/* Track Claim (FIXED) */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">Track Claim</h3>
          <p className="text-sm text-gray-500 mb-4">
            Track an existing claim
          </p>
          <button
            onClick={() => navigate("/claims/track/1")}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Track
          </button>
        </div>
      </div>

      {/* Recent Claims Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Claims</h2>
          <button
            onClick={() => navigate("/claims/status")}
            className="text-purple-600 text-sm hover:underline"
          >
            View All
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="text-left py-2">Claim ID</th>
              <th className="text-left py-2">Policy</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {recentClaims.map((claim) => (
              <tr key={claim.id} className="border-b last:border-none">
                <td className="py-2">#{claim.id}</td>
                <td>{claim.policy}</td>
                <td>{claim.type}</td>
                <td>{claim.date}</td>
                <td>
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                    {claim.status}
                  </span>
                </td>
                <td>
                  {/* FIXED VIEW / TRACK */}
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
    </div>
  );
};

export default ClaimsDashboard;



import Header from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FraudDetection() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    fetch(`${BASE_URL}/fraud/claims`)
      .then((res) => res.json())
      .then((data) => {
        setClaims(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const riskColor = {
    Low: "bg-blue-500",
    Medium: "bg-gray-400 text-black",
    High: "bg-red-500",
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />

        <div className="p-6">
          {/* Title + Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">FRAUD DETECTION</h2>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
              onClick={() => navigate("/fraud-analysis")}
            >
              RUN ANALYSIS
            </button>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading claims...</p>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Claim ID</th>
                    <th className="px-6 py-3 text-left">Claimant</th>
                    <th className="px-6 py-3 text-left">Claim Date</th>
                    <th className="px-6 py-3 text-left">Claim Amount</th>
                    <th className="px-6 py-3 text-center">Fraud Score</th>
                    <th className="px-6 py-3 text-center">Risk</th>
                  </tr>
                </thead>

                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{claim.id}</td>
                      <td className="px-6 py-4">{claim.name}</td>
                      <td className="px-6 py-4">{claim.claim_date}</td>
                      <td className="px-6 py-4">
                        ₹{claim.claim_amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
                        {claim.fraud_score}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
                            riskColor[claim.risk]
                          }`}
                        >
                          {claim.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

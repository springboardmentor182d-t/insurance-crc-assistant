import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClaims } from "../../api/claimsApi";

import "./claims.css";

function ClaimsList() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const loadClaims = async () => {
      try {
        const data = await getClaims();

        const formatted = data.map((c, index) => ({
          id: c.id ?? index + 1,
          number: c.claim_number,
          policy: c.policy_name,
          date: new Date(c.filed_date).toLocaleDateString(),
          amount: c.amount,
          status: c.status === "approved" ? "approved" : "review",
          label: c.status,
        }));

        setClaims(formatted);
      } catch (err) {
        console.error("Error loading claims:", err);
        setClaims([]);
      }
    };

    loadClaims();
  }, []);

  return (
    <div className="claims-container">

      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Track Claims</h1>
          <p>Monitor the status of your insurance claims</p>
        </div>
        <button
          className="btn primary"
          onClick={() => navigate("/file-claim")}
        >
          File New Claim
        </button>
      </div>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="card">
          <p>Total Claims</p>
          <h2>{claims.length}</h2>
        </div>
        <div className="card">
          <p>Approved</p>
          <h2 className="green">
            {claims.filter((c) => c.status === "approved").length}
          </h2>
        </div>
        <div className="card">
          <p>Under Review</p>
          <h2 className="orange">
            {claims.filter((c) => c.status === "review").length}
          </h2>
        </div>
        <div className="card">
          <p>Total Amount</p>
          <h2>
  ₹
  {claims.length === 0
    ? 0
    : claims.reduce((sum, c) => sum + Number(c.amount || 0), 0)
  }
</h2>

        </div>
      </div>

      {/* SEARCH */}
      <div className="search-bar">
        <input placeholder="Search by claim number or policy..." />
        <button className="btn outline">Filter</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Claim Number</th>
            <th>Policy</th>
            <th>Filed Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {claims.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No claims found
              </td>
            </tr>
          ) : (
            claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.number}</td>
                <td>{claim.policy}</td>
                <td>{claim.date}</td>
                <td>{claim.amount}</td>
                <td>
                  <span className={`badge ${claim.status}`}>
                    {claim.label}
                  </span>
                </td>
                <td>
                  <button
                    className="btn outline"
                    onClick={() => navigate(`/claims/${claim.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

export default ClaimsList;

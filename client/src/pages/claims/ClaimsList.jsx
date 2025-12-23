import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClaims } from "../../api/claimsApi";
import "../../styles/claims.css";

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getClaims().then(setClaims);
  }, []);

  const totalAmount = claims.reduce((sum, c) => sum + c.amount, 0);

  const countByStatus = (status) =>
    claims.filter((c) => c.status === status).length;
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const data = await getClaims();
      setClaims(data);
    } catch (err) {
      console.error("Failed to fetch claims", err);
    }
  };
  return (
    <div className="claims-page">
      {/* HEADER */}
      <div className="claims-header">
        <div>
          <h1>Track Claims</h1>
          <p>Monitor the status of your insurance claims</p>
        </div>
        <button
  className="file-new-claim-btn"
  onClick={() => navigate("/claims/new")}
>
  File New Claim
</button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Claims</p>
          <h2>{claims.length}</h2>
        </div>
        <div className="summary-card approved">
          <p>Approved</p>
          <h2>{countByStatus("Approved")}</h2>
        </div>
        <div className="summary-card review">
          <p>Under Review</p>
          <h2>{countByStatus("Under Review")}</h2>
        </div>
        <div className="summary-card amount">
          <p>Total Amount</p>
          <h2>₹ {totalAmount.toLocaleString()}</h2>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input placeholder="Search by claim number or policy..." />
        <button className="filter-btn">Filter</button>
      </div>

      {/* TABLE */}
      <div className="claims-table-wrapper">
        <table className="claims-table">
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
            {claims.map((c) => (
              <tr key={c.claim_number}>
                <td>{c.claim_number}</td>
                <td>{c.policy_name}</td>
                <td>{c.filed_date}</td>
                <td>₹ {c.amount.toLocaleString()}</td>
                <td>
                  <span
                    className={`status-pill ${
                      c.status === "Approved"
                        ? "status-approved"
                        : c.status === "Under Review"
                        ? "status-review"
                        : c.status === "Pending Documents"
                        ? "status-pending"
                        : "status-rejected"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-outline"
                    onClick={() => navigate(`/claims/${c.claim_number}`)}
                  >
                    View Details
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

export default ClaimsList;

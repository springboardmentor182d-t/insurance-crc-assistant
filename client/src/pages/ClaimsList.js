import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./claims.css";

function ClaimsList() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  // 🔹 BACKEND-IRUNDHU CLAIMS FETCH
  useEffect(() => {
    fetch("http://127.0.0.1:8000/claims/list")
      .then((res) => res.json())
      .then((data) => {
        // backend data -> UI format
        const formatted = data.map((c) => ({
          id: c.id,
          number: `CLM-2024-${String(c.id).padStart(6, "0")}`,
          policy: c.policyName,
          date: new Date(c.createdAt).toLocaleDateString(),
          amount: c.amount,
          status:
            c.status === "Approved"
              ? "approved"
              : c.status === "Rejected"
              ? "rejected"
              : "review",
          label: c.status,
        }));

        setClaims(formatted);
      })
      .catch((err) => console.error(err));
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
            {claims.reduce(
              (sum, c) =>
                sum + Number(c.amount.replace(/₹|,/g, "")),
              0
            )}
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

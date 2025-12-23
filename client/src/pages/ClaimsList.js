import { useNavigate } from "react-router-dom";
import "./claims.css";

function ClaimsList() {
  const navigate = useNavigate();

  // ✅ CENTRAL DATA (important)
  const claims = [
    {
      id: 1,
      number: "CLM-2024-001234",
      policy: "Health Shield Pro",
      date: "15 Nov 2024",
      amount: "₹45,000",
      status: "approved",
      label: "Approved",
    },
    {
      id: 2,
      number: "CLM-2024-001567",
      policy: "Auto Guard Complete",
      date: "25 Nov 2024",
      amount: "₹28,000",
      status: "review",
      label: "Under Review",
    },
    {
      id: 3,
      number: "CLM-2024-001890",
      policy: "Life Protect Plus",
      date: "1 Dec 2024",
      amount: "₹15,000",
      status: "review",
      label: "Pending Documents",
    },
    {
      id: 4,
      number: "CLM-2024-000892",
      policy: "Health Shield Pro",
      date: "10 Oct 2024",
      amount: "₹8,000",
      status: "rejected",
      label: "Rejected",
    },
  ];

  return (
    <div className="claims-container">

      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Track Claims</h1>
          <p>Monitor the status of your insurance claims</p>
        </div>
        <button className="btn primary" onClick={() => navigate("/file-claim")} >File New Claim</button>
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
            {claims.filter(c => c.status === "approved").length}
          </h2>
        </div>
        <div className="card">
          <p>Under Review</p>
          <h2 className="orange">
            {claims.filter(c => c.status === "review").length}
          </h2>
        </div>
        <div className="card">
          <p>Total Amount</p>
          <h2>₹45,000</h2>
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
          {claims.map((claim) => (
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
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ClaimsList;

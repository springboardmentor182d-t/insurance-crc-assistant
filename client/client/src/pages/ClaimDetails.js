import "./claimDetails.css";

function ClaimDetails({ status = "approved" }) {
  return (
    <div className="claim-details-container">

      {/* TOP CARD */}
      <div className={`claim-top-card ${status}`}>
        <div>
          <p className="label">Claim Number</p>
          <h2>CLM-2024-001234</h2>
          <p>Health Shield Pro • 15 Nov 2024</p>
        </div>
        <div className="amount-box">₹45,000</div>
      </div>

      <div className="details-grid">

        {/* LEFT */}
        <div>
          <div className="card">
            <h3>Claim Timeline</h3>
            <ul className="timeline">
              <li className="done">Submitted</li>
              <li className={status !== "rejected" ? "done" : ""}>Under Review</li>
              {status === "approved" && <li className="done">Approved</li>}
              {status === "rejected" && <li className="rejected-text">Rejected</li>}
            </ul>
          </div>

          <div className="card">
            <h3>Claim Information</h3>
            <p><b>Incident Date:</b> 12 Nov 2024</p>
            <p><b>Hospital:</b> Apollo Hospital, Mumbai</p>
            <p className="desc">
              Emergency hospitalization for acute appendicitis.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="card">
            <h3>Quick Actions</h3>
            <button className="btn primary">Download Report</button>
            <button className="btn outline">Contact Support</button>
          </div>

          {status === "approved" && (
            <div className="card">
              <h3>Claim Summary</h3>
              <p>Payable Amount <span>₹40,000</span></p>
            </div>
          )}

          {status === "rejected" && (
            <div className="card rejected-box">
              <h3>Rejection Reason</h3>
              <p>Insufficient supporting documents.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ClaimDetails;

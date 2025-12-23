import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClaimDetails } from "../../api/claimsApi";
import "../../styles/claims.css";

const ClaimDetails = () => {
  const { claimNumber } = useParams();
  const [claim, setClaim] = useState(null);

  useEffect(() => {
    getClaimDetails(claimNumber).then(res => setClaim(res));
  }, [claimNumber]);

  if (!claim) return null;

  const statusClass = claim.status
    ?.toLowerCase()
    ?.replace(" ", "-");

  return (
    <div className="claim-details-page">

      {/* HEADER */}
      <div className={`claim-header ${statusClass}`}>
        <div>
          <p className="label">Claim Number</p>
          <h1>{claim.claim_number}</h1>
          <p className="sub">{claim.policy_name || "-"}</p>
          <p className="sub">Filed On {claim.filed_date || "-"}</p>
        </div>

        <div className="amount-box">
          <p className="label">Claim Amount</p>
          <h2>₹ {claim.amount || 0}</h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="claim-grid">

        {/* TIMELINE */}
        <div className="card">
          <h3>Claim Timeline</h3>

          <div className="timeline">
            <div className="step done">
              <span>✓</span>
              <div>
                <strong>Submitted</strong>
                <p>{claim.filed_date || "-"}</p>
              </div>
            </div>

            <div className={`step ${claim.status !== "Submitted" ? "done" : ""}`}>
              <span>✓</span>
              <div>
                <strong>Under Review</strong>
                <p>{claim.status === "Under Review" ? "In progress" : "-"}</p>
              </div>
            </div>

            <div className={`step ${claim.status === "Approved" ? "done" : "pending"}`}>
              <span>{claim.status === "Approved" ? "✓" : "○"}</span>
              <div>
                <strong>Approved</strong>
                <p>{claim.status === "Approved" ? claim.filed_date : "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-column">

          {/* ACTIONS */}
          <div className="card">
            <h3>Quick Actions</h3>
            <button className="btn-primary">Download Report</button>
            <button className="btn-outline">Contact Support</button>
          </div>

          {/* SUMMARY */}
          <div className="card">
            <h3>Claim Summary</h3>

            <div className="summary-row">
              <span>Claimed Amount</span>
              <span>₹ {claim.amount || 0}</span>
            </div>

            <div className="summary-row">
              <span>Deductible</span>
              <span>₹ {claim.deductible || 0}</span>
            </div>

            <div className="summary-row">
              <span>Processing Fee</span>
              <span>₹ 0</span>
            </div>

            <div className="summary-row total">
              <span>Payable Amount</span>
              <span className="green">
                ₹ {claim.status === "Approved" ? claim.payable_amount || 0 : 0}
              </span>
            </div>
          </div>

          {/* ASSESSOR */}
          <div className="card assessor">
            <div className="avatar">RA</div>
            <div>
              <strong>Rahul Mehta</strong>
              <p>Senior Assessor</p>
              <small>Your claim is being reviewed by our assessment team.</small>
            </div>
          </div>

        </div>
      </div>

      {/* INFORMATION */}
      <div className="card full">
        <h3>Claim Information</h3>

        <div className="info-grid">
          <div>
            <label>Incident Date</label>
            <p>{claim.incident_date || "-"}</p>
          </div>

          <div>
            <label>Claim Type</label>
            <p>{claim.claim_type || "-"}</p>
          </div>

          <div>
            <label>Location</label>
            <p>{claim.location || "-"}</p>
          </div>

          <div>
            <label>Reference Number</label>
            <p>{claim.reference_number || "-"}</p>
          </div>
        </div>

        <p className="description">
          {claim.description || "-"}
        </p>
      </div>

      {/* DOCUMENTS */}
      <div className="card full">
        <h3>Uploaded Documents</h3>

        {claim.documents?.length > 0 ? (
          claim.documents.map((doc, i) => (
            <div className="document" key={i}>
              <span>{doc.name}</span>
              <small>{doc.size}</small>
              <button>⬇</button>
            </div>
          ))
        ) : (
          <p>No documents uploaded</p>
        )}
      </div>

    </div>
  );
};

export default ClaimDetails;

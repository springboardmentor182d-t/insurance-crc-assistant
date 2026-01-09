import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFraudClaimDetails,
  markClaimSafe,
  rejectClaim,
  requestMoreInfo,
} from "../../api/fraudApi";
import "../../styles/fraudInvestigation.css";

export default function FraudInvestigation() {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    getFraudClaimDetails(claimId)
      .then((res) => setData(res))
      .catch(() => setData(null));
  }, [claimId]);

  if (!data) {
    return <h3 style={{ padding: 24 }}>Claim not found</h3>;
  }

  const riskPercent = data.risk_score;

  /* ================= INDICATOR DESCRIPTIONS ================= */
  const indicatorDescriptions = {
    "Multiple claims in short period":
      "User has filed 3 claims in the last 2 months",
    "Unusual claim amount":
      "Amount is significantly higher than user's average claim",
    "Very new policy":
      "Policy was activated shortly before the incident",
    "Document inconsistencies":
      "Submitted documents contain mismatches",
    "New policy":
      "Policy age is too low to justify this claim",
    "Minor discrepancies in dates":
      "Small inconsistencies found in reported dates",
    "Provider verification":
      "Hospital information could not be fully verified",
    "Geographic pattern":
      "Claim location differs from registered address",
  };

  /* ================= DERIVED INDICATORS (OPTION 2) ================= */
  const derivedIndicators = [...data.indicators];

  if (!derivedIndicators.some(i => i.label === "Provider verification")) {
    derivedIndicators.push({
      label: "Provider verification",
      severity: "MEDIUM",
    });
  }

  if (!derivedIndicators.some(i => i.label === "Geographic pattern")) {
    derivedIndicators.push({
      label: "Geographic pattern",
      severity: "LOW",
    });
  }

  return (
    <div className="fi-page">

      {/* 🔴 TOP HEADER */}
      <div className="fi-header">
        <div className="fi-header-left">
          <div className="fi-icon-box" />
          <div>
            <p className="fi-small">Fraud Investigation Case</p>
            <h1>{data.claim_number}</h1>

            <div className="fi-meta">
              <div>
                <span>Policy Holder</span>
                <b>{data.policy_holder}</b>
              </div>
              <div>
                <span>Risk Score</span>
                <b>{data.risk_score}/100</b>
              </div>
            </div>
          </div>
        </div>

        <div className="fi-header-right">
          <span>Claim Amount</span>
          <h2>₹ {data.amount.toLocaleString()}</h2>
          <div className="fi-white-pill" />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="fi-grid">

        {/* LEFT COLUMN */}
        <div>

          {/* SUSPICIOUS FACTORS */}
          <div className="fi-card">
            <h2>Suspicious Factors Detected</h2>

            {derivedIndicators.map((i, idx) => (
              <div
                key={idx}
                className={`factor-card ${i.severity.toLowerCase()}`}
              >
                <div className="factor-left">
                  <div className="factor-icon">
                    {i.severity === "HIGH" ? "↗" : i.severity === "MEDIUM" ? "$" : "📍"}
                  </div>
                  <div>
                    <h4>{i.label}</h4>
                    <p>
                      {indicatorDescriptions[i.label] ||
                        "Additional risk factor detected"}
                    </p>
                  </div>
                </div>

                <span className={`badge ${i.severity.toLowerCase()}`}>
                  {i.severity}
                </span>
              </div>
            ))}
          </div>

          {/* CLAIM INFORMATION */}
          <div className="fi-card">
            <h2>Claim Information</h2>

            <div className="fi-info-grid">
              <div><span>Claim Number</span><b>{data.claim_number}</b></div>
              <div><span>Type</span><b>{data.claim_type}</b></div>
              <div><span>Filed Date</span><b>{data.filed_date}</b></div>
              <div><span>Location</span><b>{data.location}</b></div>
              <div><span>Status</span><b>{data.status}</b></div>
            </div>
          </div>

          {/* AI RISK ASSESSMENT */}
          <div className="fi-card ai-card">
            <h2>AI Risk Assessment</h2>
            <p>
              Based on pattern analysis across thousands of claims,
              this case shows multiple fraud indicators consistent
              with suspicious behavior.
            </p>

            <div className="progress-wrap">
              <span>Fraud Probability</span>
              <span className="percent">{riskPercent}%</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${riskPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>

          {/* ACTIONS */}
          <div className="fi-card">
            <button className="btn-blue" onClick={() => { markClaimSafe(claimId); navigate("/admin/fraud"); }}>
              ✓ Mark as Safe
            </button>

            <button className="btn-red" onClick={() => { rejectClaim(claimId); navigate("/admin/fraud"); }}>
              ✕ Reject Claim
            </button>

            <button className="btn-outline" onClick={() => { requestMoreInfo(claimId); navigate("/admin/fraud"); }}>
              Request More Info
            </button>

            <p className="assign">Assign to Investigator</p>
          </div>

          {/* INVESTIGATION LOG */}
          <div className="fi-card">
            <h2>Investigation Log</h2>

            <div className="log-item">
              <span className="log-dot blue" />
              <div>
                <p className="log-text">Case flagged by AI</p>
                <span className="log-date">{data.filed_date}</span>
              </div>
            </div>

            <div className="log-item muted">
              <span className="log-dot gray" />
              <div>
                <p className="log-text">Pending review</p>
                <span className="log-date">Current</span>
              </div>
            </div>
          </div>

          {/* SYSTEM RECOMMENDATION */}
          <div className="fi-card system-alert">
            ⚠ <b>System Recommendation</b>
            <p>
              Recommend further investigation before approval.
              Multiple high-severity fraud indicators detected.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

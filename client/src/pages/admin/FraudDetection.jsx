import React, { useEffect, useState } from "react";
import { getFraudDashboard } from "../../api/fraudApi";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // ✅ ADD
import "../../styles/fraud.css";

/* =============================
   RISK RING COMPONENT
============================= */
function RiskRing({ score, level }) {
  const radius = 34;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={radius * 2} height={radius * 2} className={`risk-ring ${level}`}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className="ring-progress"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
      <text x="50%" y="52%" textAnchor="middle" className="ring-text">
        {score}
      </text>
    </svg>
  );
}

/* =============================
   MAIN PAGE
============================= */
export default function FraudDetection() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFraudDashboard().then((res) => setData(res));
  }, []);

  if (!data) return null;

  /* =============================
     EXCEL DOWNLOAD FUNCTION
  ============================= */
  const downloadExcel = () => {
  /* ================= SUMMARY SHEET ================= */
  const summarySheet = [
    {
      "Total Flagged": data.summary.total_flagged,
      "High Risk": data.summary.high,
      "Medium Risk": data.summary.medium,
      "Low Risk": data.summary.low,
      "Potential Loss": data.claims
        .filter(c => c.risk_level !== "Low")
        .reduce((s, c) => s + c.amount, 0),
    },
  ];

  /* ================= CLAIM DETAILS SHEET ================= */
  const claimsSheet = data.claims.map(c => ({
    "Claim Number": c.claim_number,
    "Policy Holder": c.policy_holder,
    "Risk Score": c.risk_score,
    "Risk Level": c.risk_level,
    "Claim Amount": c.amount,
    "Status": c.status,
    "Location": c.location,
    "Claim Type": c.claim_type,
    "Filed Date": c.filed_date,
    "Fraud Indicators": c.indicators.map(i => i.label).join(", "),
  }));

  /* ================= CREATE WORKBOOK ================= */
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(summarySheet),
    "Summary"
  );

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(claimsSheet),
    "Claims"
  );

  XLSX.writeFile(wb, "Fraud_Detection_Report.xlsx");
};


  return (
    <div className="fraud-page">

      {/* HEADER */}
      <div className="fraud-header">
        <div>
          <h2>Fraud Detection</h2>
          <p className="subtitle">
            AI-powered fraud detection and risk assessment
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {/* ✅ DOWNLOAD BUTTON */}
          <button
  className="download-btn"
  onClick={downloadExcel}
>
  ⬇ Download Report
</button>


          <button
            className="back-btn-primary"
            onClick={() => navigate("/admin")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="summary-row">
        <SummaryCard
          title="Total Flagged"
          value={data.summary.total_flagged}
          sub="Needs review"
        />
        <SummaryCard
          title="High Risk"
          value={data.summary.high}
          sub="Immediate action"
          danger
        />
        <SummaryCard
          title="Medium Risk"
          value={data.summary.medium}
          sub="Under review"
          warning
        />
        <SummaryCard
          title="Potential Loss"
          value={`₹${data.claims
            .filter(c => c.risk_level !== "Low")
            .reduce((s, c) => s + c.amount, 0)
            .toLocaleString()}`}
        />
      </div>

      {/* SEARCH */}
      <div className="search-row">
        <input placeholder="Search by claim number or policy holder..." />
        <button className="filter-btn">Filter by Risk</button>
      </div>

      {/* CLAIMS */}
      {data.claims.map((c) => (
        <div key={c.claim_id} className={`fraud-card ${c.risk_level.toLowerCase()}`}>

          <div className="risk-strip">
            <RiskRing score={c.risk_score} level={c.risk_level.toLowerCase()} />
            <span className={`risk-badge ${c.risk_level.toLowerCase()}`}>
              {c.risk_level} Risk
            </span>
          </div>

          <div className="claim-center">
            <h4>
              {c.claim_number} <span className="warn">⚠</span>
            </h4>

            <p className="policy-holder">
              Policy Holder: <strong>{c.policy_holder}</strong>
            </p>

            <p className="muted">Location: {c.location}</p>

            <div className="fraud-indicators">
              <p className="label">Fraud Indicators:</p>
              <div className="chips">
                {c.indicators.map((i, idx) => (
                  <span key={idx}>{i.label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="claim-right">
            <div className="amount">₹{c.amount.toLocaleString()}</div>

            <button
              className="btn-investigate"
              onClick={() => navigate(`/admin/fraud/${c.claim_id}`)}
            >
              Investigate
            </button>

            <button className="btn-safe">Mark as Safe</button>

            <span className="btn-escalate">Escalate Case</span>

            <div className="filed">
              Filed: {c.filed_date}
            </div>
          </div>
        </div>
      ))}

      <div className="ai-footer">
        <h4>AI-Powered Detection</h4>
        <p>
          Our advanced machine learning algorithms analyze patterns,
          anomalies, and historical data to identify potentially
          fraudulent claims.
        </p>
      </div>
    </div>
  );
}

/* =============================
   SUMMARY CARD
============================= */
function SummaryCard({ title, value, sub, danger, warning }) {
  return (
    <div className={`summary-card ${danger ? "danger" : warning ? "warning" : ""}`}>
      <p>{title}</p>
      <h3>{value}</h3>
      <span>{sub}</span>
    </div>
  );
}

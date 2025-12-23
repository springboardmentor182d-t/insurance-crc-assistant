import "./fileClaim.css";
import { useNavigate } from "react-router-dom";

function FileClaim() {
  const navigate = useNavigate();

  const policies = [
    {
      id: 1,
      name: "Health Shield Pro",
      insurer: "SecureLife Insurance",
      number: "HSP-2024-001234",
      valid: "31 Dec 2024",
      icon: "❤️",
      theme: "pink",
    },
    {
      id: 2,
      name: "Life Protect Plus",
      insurer: "Guardian Insurance",
      number: "LPP-2024-005678",
      valid: "15 Mar 2025",
      icon: "🛡️",
      theme: "blue",
    },
    {
      id: 3,
      name: "Auto Guard Complete",
      insurer: "DriveSecure",
      number: "AGC-2024-009012",
      valid: "20 Jun 2025",
      icon: "🚗",
      theme: "yellow",
    },
  ];

  return (
    <div className="file-claim-page">

      {/* STEPS */}
      <div className="stepper">
        <div className="step active">
          <span>1</span>
          <p>Select Policy</p>
        </div>
        <div className="line"></div>
        <div className="step">
          <span>2</span>
          <p>Incident Details</p>
        </div>
        <div className="line"></div>
        <div className="step">
          <span>3</span>
          <p>Upload Documents</p>
        </div>
      </div>

      <h1>File a Claim</h1>
      <p className="subtitle">
        Select the policy for which you want to file a claim
      </p>

      {/* POLICY CARDS */}
      <div className="policy-wrapper">
        {policies.map((p) => (
          <div
            key={p.id}
            className={`policy-card ${p.theme}`}
            onClick={() => navigate("/claims/incident", { state: p })}
          >
            <div className="left">
              <div className="icon">{p.icon}</div>
            </div>

            <div className="middle">
              <h3>{p.name}</h3>
              <p>{p.insurer}</p>
              <div className="meta">
                <span>
                  <b>Policy Number</b><br />{p.number}
                </span>
                <span>
                  <b>Valid Until</b><br />{p.valid}
                </span>
              </div>
            </div>

            <div className="right">›</div>
          </div>
        ))}
      </div>

      <p className="help">
        Need help with your claim? <span>Contact Support</span>
      </p>
    </div>
  );
}

export default FileClaim;

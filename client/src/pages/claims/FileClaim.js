import "./fileClaim.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPolicies } from "../../api/claimsApi";



function FileClaim() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
  const loadPolicies = async () => {
    const data = await getPolicies();
    setPolicies(data);
  };

  loadPolicies();
}, []);


  return (
    <div className="file-claim-page">

      {/* STEPS */}
      <div className="stepper">
        <div className="step active"><span>1</span><p>Select Policy</p></div>
        <div className="line"></div>
        <div className="step"><span>2</span><p>Incident Details</p></div>
        <div className="line"></div>
        <div className="step"><span>3</span><p>Upload Documents</p></div>
      </div>

      <h1>File a Claim</h1>
      <p className="subtitle">
        Select the policy for which you want to file a claim
      </p>

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
                  <b>Policy Number</b><br />{p.policy_number}
                </span>
                <span>
                  <b>Valid Until</b><br />{p.valid_until}
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

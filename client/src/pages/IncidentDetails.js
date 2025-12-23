import "./incidentDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

function IncidentDetails() {
  const navigate = useNavigate();
  const { state } = useLocation(); // selected policy

  return (
    <div className="incident-page">

      {/* STEPPER */}
      <div className="stepper">
        <div className="step done">✔ Select Policy</div>
        <div className="line active"></div>
        <div className="step active">2 Incident Details</div>
        <div className="line"></div>
        <div className="step">3 Upload Documents</div>
      </div>

      <h2>Incident Details</h2>
      <p className="subtitle">Provide information about your claim</p>

      {/* SELECTED POLICY */}
      <div className="selected-policy">
        <p className="small">Filing claim for:</p>
        <h3>{state?.name}</h3>
        <p className="policy-no">Policy: {state?.number}</p>
      </div>

      {/* FORM */}
      <div className="form-card">
        <div className="row">
          <div>
            <label>Incident Date</label>
            <input type="date" />
          </div>

          <div>
            <label>Incident Type</label>
            <input placeholder="Accident / Hospitalization" />
          </div>
        </div>

        <div>
          <label>Location</label>
          <input placeholder="Enter the location where incident occurred" />
        </div>

        <div>
          <label>Estimated Claim Amount</label>
          <input placeholder="₹ Enter estimated amount" />
        </div>

        <div>
          <label>Description</label>
          <textarea placeholder="Provide detailed information about the incident..." />
        </div>

        {/* ACTIONS */}
        <div className="actions">
          <button className="back" onClick={() => navigate(-1)}>Back</button>
          <button
            className="next"
            onClick={() => navigate("/claims/upload")}
          >
            Continue to Documents
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncidentDetails;

import "./incidentDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { submitClaim } from "../api/claimsApi";

function IncidentDetails() {
  const navigate = useNavigate();
  const { state } = useLocation(); // selected policy data

  // 🔹 FORM STATE
  const [formData, setFormData] = useState({
    policyName: state?.name || "",
    policyNumber: state?.number || "",
    incidentDate: "",
    incidentType: "",
    location: "",
    amount: "",
    description: "",
  });

  // 🔹 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 SUBMIT & GO TO UPLOAD PAGE
  const handleSubmit = async () => {
    try {
      await submitClaim(formData); // backend API call
      navigate("/claims/upload");
    } catch (error) {
      alert("❌ Failed to submit incident details");
      console.error(error);
    }
  };

  return (
    <div className="incident-page">

      {/* 🔹 STEPPER */}
      <div className="stepper">
        <div className="step done">✔ Select Policy</div>
        <div className="line active"></div>
        <div className="step active">2 Incident Details</div>
        <div className="line"></div>
        <div className="step">3 Upload Documents</div>
      </div>

      <h2>Incident Details</h2>
      <p className="subtitle">Provide information about your claim</p>

      {/* 🔹 SELECTED POLICY */}
      <div className="selected-policy">
        <p className="small">Filing claim for:</p>
        <h3>{state?.name}</h3>
        <p className="policy-no">Policy: {state?.number}</p>
      </div>

      {/* 🔹 FORM CARD */}
      <div className="form-card">
        <div className="row">
          <div>
            <label>Incident Date</label>
            <input
              type="date"
              name="incidentDate"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Incident Type</label>
            <input
              name="incidentType"
              placeholder="Accident / Hospitalization"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Location</label>
          <input
            name="location"
            placeholder="Enter the location where incident occurred"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Estimated Claim Amount</label>
          <input
            name="amount"
            placeholder="₹ Enter estimated amount"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Provide detailed information about the incident..."
            onChange={handleChange}
          />
        </div>

        {/* 🔹 ACTION BUTTONS */}
        <div className="actions">
          <button className="back" onClick={() => navigate(-1)}>
            Back
          </button>

          <button className="next" onClick={handleSubmit}>
            Continue to Documents
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncidentDetails;

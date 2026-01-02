import "./PolicyDetails.css";
import { useParams } from "react-router-dom";
import { fetchPolicyById } from "../services/policyService";
import { useEffect, useState } from "react";

import {
  FaHeart,
  FaShieldAlt,
  FaCar,
  FaPlane,
  FaHome
} from "react-icons/fa";

/* 🔹 Policy Icon Resolver */
const getPolicyIcon = (category) => {
  switch (category) {
    case "Health":
      return <FaHeart className="policy-icon health" />;
    case "Life":
      return <FaShieldAlt className="policy-icon life" />;
    case "Auto":
      return <FaCar className="policy-icon auto" />;
    case "Travel":
      return <FaPlane className="policy-icon travel" />;
    case "Home":
      return <FaHome className="policy-icon home" />;
    default:
      return <FaShieldAlt className="policy-icon default" />;
  }
};

const PolicyDetails = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    fetchPolicyById(id).then(setPolicy);
  }, [id]);

  if (!policy) return <div className="loading">Loading...</div>;

  return (
    <div className="policy-details-page">
      {/* LEFT COLUMN */}
      <div className="left-column">
        {/* HEADER */}
        <div className="policy-header-card">
          <div className="icon-wrapper">
            {getPolicyIcon(policy.category)}
          </div>

          <div>
            <h1>{policy.name}</h1>
            <p className="provider">{policy.provider}</p>

            <div className="amounts">
              <div className="amount blue">
                <span>Annual Premium</span>
                <b>₹ {policy.premium}</b>
              </div>

              <div className="amount green">
                <span>Sum Insured</span>
                <b>₹ {policy.coverage}</b>
              </div>
            </div>

            <div className="actions">
              <button className="outline-btn">Add to Compare</button>
              <button className="primary-btn">Buy Now</button>
            </div>
          </div>
        </div><br></br>

        {/* COVERAGE */}
        <div className="card">
          <h3>Coverage Details</h3>
          <div className="grid-2">
            <p><b>Policy Term:</b> {policy.term}</p>
            <p><b>Deductible:</b> ₹ {policy.deductible ?? "N/A"}</p>
            <p><b>Waiting Period:</b> {policy.waitingPeriod}</p>
            <p><b>Room Rent Limit:</b> {policy.roomRent ?? "N/A"}</p>
          </div>
        </div>
  <br></br>
        {/* BENEFITS */}
        <div className="card">
          <h3>Benefits Included</h3>
          <ul className="list green">
            {policy.benefits?.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
<br></br>
        {/* EXCLUSIONS */}
        <div className="card">
          <h3>Exclusions</h3>
          <ul className="list red">
            {policy.exclusions?.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-column">
        <div className="illustration-card center">
          <img src="/policy-illustration.png" alt="Policy Illustration" />
        </div>

        <div className="card score center">
          <h3>Policy Score</h3>
          <div className="circle">8.5/10</div>
          <p className="muted">Highly Recommended</p>
        </div><br></br>

        <div className="card">
          <h3>Provider Rating</h3>
          <p>Claim Settlement: <b>95%</b></p>
          <p>Customer Service: <b>4.5/5</b></p>
          <p>TAT (Days): <b>7</b></p>
        </div>
          <br></br>
        <div className="card offer">
          <h4>Special Offer</h4>
          <p>Get 10% discount on annual premium</p>
          <button className="primary-btn">Claim Offer</button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;

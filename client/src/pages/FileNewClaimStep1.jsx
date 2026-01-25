import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

/* ===============================
   STATIC CLAIM TYPES
================================ */
const ALL_CLAIM_TYPES = [
  "Hospitalization",
  "Day Care Treatment",
  "Pre-Hospitalization Expenses",
  "Post-Hospitalization Expenses",
  "Emergency Treatment",
  "Ambulance Charges",
  "Death Claim",
  "Maturity Claim",
  "Accidental Death Claim",
  "Critical Illness Claim",
  "Fire Damage",
  "Theft / Burglary",
  "Natural Calamity",
  "Structural Damage",
  "Electrical Damage",
  "Medical Emergency",
  "Trip Cancellation",
  "Trip Delay",
  "Baggage Loss",
  "Passport Loss",
  "Accident Damage",
  "Third-Party Damage",
  "Total Loss",
  "Personal Accident",
  "Business Interruption",
  "Liability Claim",
];

const FileNewClaimStep1 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(true);

  const [formData, setFormData] = useState({
    user_policy_id: "",
    claim_type: "",
    incident_date: "",
    description: "",
    amount_claimed: "",
  });

  /* ================= FETCH POLICIES ================= */
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/active-policies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch policies");

        const data = await res.json();
        setPolicies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Policy fetch error:", err);
        setPolicies([]);
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, [token]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (
      !formData.user_policy_id ||
      !formData.claim_type ||
      !formData.incident_date
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/claims/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_policy_id: formData.user_policy_id,
          claim_type: formData.claim_type,
          incident_date: formData.incident_date,
          description: formData.description || null,
          amount_claimed: formData.amount_claimed
            ? Number(formData.amount_claimed)
            : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to create claim");

      const data = await res.json();
      localStorage.setItem("claim_id", data.id);
      navigate("/claims/file/step2");
    } catch (err) {
      console.error("Create claim error:", err);
      alert("Error creating claim");
    }
  };

  /* ================= UI ================= */
  return (
    <div
      className="min-h-screen px-4 sm:px-8 py-10
                 bg-[var(--bg-main)] text-[var(--text-main)]"
    >
      <div
        className="max-w-3xl mx-auto
                   bg-[var(--bg-card)]
                   border border-[var(--border)]
                   rounded-2xl p-6 sm:p-8 space-y-6"
      >
        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            File New Claim
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Step 1 of 3 · Claim details
          </p>
        </div>

        {/* POLICY */}
        <div>
          <label className="text-sm font-medium">
            Select Active Policy
          </label>
          <select
            name="user_policy_id"
            value={formData.user_policy_id}
            onChange={handleChange}
            disabled={loadingPolicies}
            className="w-full mt-2 px-3 py-2.5 rounded-lg
                       bg-[var(--bg-main)]
                       border border-[var(--border)]"
          >
            <option value="">
              {loadingPolicies ? "Loading policies..." : "Select Policy"}
            </option>
            {policies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.policy_name} ({p.provider_name})
              </option>
            ))}
          </select>
        </div>

        {/* CLAIM TYPE */}
        <div>
          <label className="text-sm font-medium">
            Claim Type
          </label>
          <select
            name="claim_type"
            value={formData.claim_type}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2.5 rounded-lg
                       bg-[var(--bg-main)]
                       border border-[var(--border)]"
          >
            <option value="">Select Claim Type</option>
            {ALL_CLAIM_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* INCIDENT DATE */}
        <div>
          <label className="text-sm font-medium">
            Incident Date
          </label>
          <input
            type="date"
            name="incident_date"
            value={formData.incident_date}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2.5 rounded-lg
                       bg-[var(--bg-main)]
                       border border-[var(--border)]"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-2 px-3 py-2.5 rounded-lg resize-none
                       bg-[var(--bg-main)]
                       border border-[var(--border)]"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-medium">
            Amount Claimed
          </label>
          <input
            type="number"
            name="amount_claimed"
            value={formData.amount_claimed}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2.5 rounded-lg
                       bg-[var(--bg-main)]
                       border border-[var(--border)]"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <button
            onClick={() => navigate("/claims")}
            className="px-6 py-2.5 rounded-lg
                       border border-[var(--border)]
                       text-[var(--text-muted)]
                       hover:bg-[var(--bg-main)]"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg text-white font-medium
                       bg-indigo-600
                       hover:opacity-90"
          >
            Next: Upload Documents →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileNewClaimStep1;

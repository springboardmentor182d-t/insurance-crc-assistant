import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const FileNewClaimStep1 = () => {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(true);

  const [formData, setFormData] = useState({
    policy: "",
    claim_type: "",
    incident_date: "",
    description: "",
    amount_claimed: "",
  });

  // =========================
  // FETCH POLICY OPTIONS FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/policies`);
        if (!res.ok) throw new Error("Failed to fetch policies");

        const data = await res.json();
        setPolicies(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load policy options");
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, []);

  // =========================
  // HANDLE FORM CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT CLAIM (STEP 1)
  // =========================
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${baseURL}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          policy: formData.policy,
          claim_type: formData.claim_type,
          incident_date: formData.incident_date,
          description: formData.description,
          amount_claimed: Number(formData.amount_claimed),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create claim");
      }

      const data = await res.json();

      // Save claim ID for next steps
      localStorage.setItem("claim_id", data.id);

      navigate("/claims/file/step2");
    } catch (error) {
      console.error(error);
      alert("Error creating claim. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        File New Claim – Step 1
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {/* POLICY */}
        <div>
          <label className="text-sm font-medium">Policy</label>
          <select
            name="policy"
            value={formData.policy}
            onChange={handleChange}
            disabled={loadingPolicies}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">
              {loadingPolicies ? "Loading policies..." : "Select Policy"}
            </option>
            {policies.map((policy) => (
              <option key={policy} value={policy}>
                {policy}
              </option>
            ))}
          </select>
        </div>

        {/* CLAIM TYPE */}
        <div>
          <label className="text-sm font-medium">Claim Type</label>
          <select
            name="claim_type"
            value={formData.claim_type}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Select Claim Type</option>
            <option value="Hospitalization">Hospitalization</option>
            <option value="Accident">Accident</option>
            <option value="Theft">Theft</option>
          </select>
        </div>

        {/* INCIDENT DATE */}
        <div>
          <label className="text-sm font-medium">Incident Date</label>
          <input
            type="date"
            name="incident_date"
            value={formData.incident_date}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-medium">Amount Claimed</label>
          <input
            type="number"
            name="amount_claimed"
            value={formData.amount_claimed}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/claims")}
            className="px-6 py-2 border rounded"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Next: Upload Documents →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileNewClaimStep1;

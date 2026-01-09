import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";
// ✅ IMPORT BASE URL

const FileNewClaimStep1 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    policy: "",
    claim_type: "",
    incident_date: "",
    description: "",
    amount_claimed: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${ baseURL }/claims`, {
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

      if (!response.ok) {
        throw new Error("Failed to create claim");
      }

      const data = await response.json();

      // Save claim_id for next steps
      localStorage.setItem("claim_id", data.id);

      // Go to Step 2
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
        <div>
          <label className="text-sm font-medium">Policy</label>
          <select
            name="policy"
            value={formData.policy}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Select Policy</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Travel Insurance">Travel Insurance</option>
            <option value="Motor Insurance">Motor Insurance</option>
          </select>
        </div>

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

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Estimated Amount</label>
          <input
            type="number"
            name="amount_claimed"
            value={formData.amount_claimed}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

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

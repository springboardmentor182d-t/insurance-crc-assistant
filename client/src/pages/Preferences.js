import React, { useState } from "react";
import { Heart, Shield, Car, Plane, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const navigate = useNavigate();

  const [policyType, setPolicyType] = useState("Health");
  const [budget, setBudget] = useState(55000);
  const [coverage, setCoverage] = useState(4100000);
  const [risk, setRisk] = useState("Medium");
  const [saving, setSaving] = useState(false);

  // ✅ Validation
  const isValid =
    policyType &&
    budget >= 5000 &&
    coverage >= 100000 &&
    risk;

  // ✅ Save preferences and redirect
  const savePreferences = () => {
    if (!isValid) return;

    setSaving(true);

    const payload = {
      policy_type: policyType,
      annual_budget: budget,
      desired_coverage: coverage,
      risk_appetite: risk,
    };

    fetch("http://127.0.0.1:8000/users/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        // ✅ Redirect to recommendations
        navigate("/recommendations");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to save preferences ❌");
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Set Your Preferences
        </h1>

        {/* MAIN CARD */}
        <div className="bg-white border rounded-xl p-8 space-y-7">

          {/* Insurance Type */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Choose Insurance Type
            </h2>

            <div className="grid grid-cols-5 gap-3">
              {[
                { label: "Health", icon: Heart },
                { label: "Life", icon: Shield },
                { label: "Auto", icon: Car },
                { label: "Travel", icon: Plane },
                { label: "Home", icon: Home },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  onClick={() => setPolicyType(label)}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl cursor-pointer border transition-all
                    ${
                      policyType === label
                        ? "border-orange-400 bg-orange-50 text-orange-600 scale-105 shadow-sm"
                        : "hover:border-gray-400 text-gray-600 hover:scale-105"
                    }`}
                >
                  <Icon
                    size={26}
                    className={
                      policyType === label
                        ? "text-orange-500"
                        : "text-gray-500"
                    }
                  />
                  <span className="text-sm font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Budget */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                Annual Budget
              </h2>
              <span className="text-blue-600 font-medium">
                ₹ {budget.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(+e.target.value)}
              className="w-full accent-blue-600"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹ 5,000</span>
              <span>₹ 1,00,000</span>
            </div>
          </div>

          {/* Desired Coverage */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                Desired Coverage
              </h2>
              <span className="text-blue-600 font-medium">
                ₹ {coverage.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={coverage}
              onChange={(e) => setCoverage(+e.target.value)}
              className="w-full accent-blue-600"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹ 1 Lakh</span>
              <span>₹ 1 Crore</span>
            </div>
          </div>

          {/* Risk Appetite */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Risk Appetite
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {["Low", "Medium", "High"].map((level) => (
                <div
                  key={level}
                  onClick={() => setRisk(level)}
                  className={`border rounded-xl p-4 cursor-pointer transition ${
                    risk === level
                      ? "border-orange-400 bg-orange-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <h3 className="font-semibold text-sm">
                    {level}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Validation message */}
          {!isValid && (
            <p className="text-sm text-red-500">
              Please complete all selections before saving.
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              className="px-4 py-2 text-sm border rounded-lg"
              disabled={saving}
            >
              Skip for Now
            </button>

            <button
              onClick={savePreferences}
              disabled={!isValid || saving}
              className={`px-5 py-2 text-sm rounded-lg text-white
                ${
                  isValid && !saving
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;


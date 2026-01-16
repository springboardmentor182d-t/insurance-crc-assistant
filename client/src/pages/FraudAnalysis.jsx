import React, { useState } from "react";
import Header from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

const RULES = [
  { id: "FRD-001", label: "High Claim Amount" },
  { id: "FRD-002", label: "Early Policy Claim" },
  { id: "FRD-003", label: "Multiple Claims" },
  { id: "FRD-004", label: "Document Issues" },
  { id: "FRD-005", label: "Shared Bank Account" },
];

const FraudAnalytics = () => {
  const [selectedRules, setSelectedRules] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeRule = (id) => {
    setSelectedRules(selectedRules.filter((r) => r.id !== id));
  };

  const runAnalytics = () => {
    setLoading(true);
    setResult(null);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/fraud/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rule_ids: selectedRules.map((r) => r.id),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  /* ---- Derived Metrics ---- */
  const totalClaims = result?.claims?.length || 0;
  const highRiskClaims =
    result?.claims?.filter((c) => c.risk === "High").length || 0;
  const mediumRiskClaims =
    result?.claims?.filter((c) => c.risk === "Medium").length || 0;
  const lowRiskClaims =
    result?.claims?.filter((c) => c.risk === "Low").length || 0;
  const pieData = result
    ? [
        { name: "High", value: result.risk_distribution.High },
        { name: "Medium", value: result.risk_distribution.Medium },
        { name: "Low", value: result.risk_distribution.Low },
      ]
    : [];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Header />

        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Fraud Risk Analytics</h2>

          {/* Rule Selector */}
          <div className="bg-white p-5 rounded-xl shadow space-y-4">
            <select
              className="w-full border rounded p-2"
              onChange={(e) => {
                const rule = RULES.find((r) => r.id === e.target.value);
                if (rule && !selectedRules.some((r) => r.id === rule.id)) {
                  setSelectedRules([...selectedRules, rule]);
                }
                e.target.value = "";
              }}
            >
              <option value="">Select a rule</option>
              {RULES.map((rule) => (
                <option key={rule.id} value={rule.id}>
                  {rule.id} - {rule.label}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {selectedRules.map((rule, index) => (
                <span
                  key={rule.id}
                  className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {index + 1}. {rule.label}
                  <button
                    onClick={() => removeRule(rule.id)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <button
              disabled={selectedRules.length === 0}
              onClick={runAnalytics}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Run Analysis
            </button>
          </div>

          {loading && <p>Running analytics...</p>}

          {result && (
            <>
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Total Claims</p>
                  <p className="text-2xl font-bold">{totalClaims}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">High Risk Claims</p>
                  <p className="text-2xl font-bold text-red-600">
                    {highRiskClaims}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Medium Risk Claims</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {mediumRiskClaims}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Low Risk Claims</p>
                  <p className="text-2xl font-bold text-green-600">
                    {lowRiskClaims}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.claims.map((claim) => (
                  <div
                    key={claim.id}
                    className="bg-white p-4 rounded-xl shadow"
                  >
                    <p className="font-semibold">Claim ID: {claim.id}</p>
                    <p>Policy Holder: {claim.name}</p>
                    <p className="font-semibold">
                      Fraud Score: {claim.fraud_score}
                    </p>

                    <ul className="list-disc ml-5 text-sm text-gray-600 mt-2">
                      {claim.triggered_rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Claims Risk Distribution</h3>

                <div className="w-full h-64">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default FraudAnalytics;

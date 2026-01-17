import React, { useState } from "react";
import Header from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
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
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  const removeRule = (id) => {
    setSelectedRules(selectedRules.filter((r) => r.id !== id));
  };

  const runAnalytics = () => {
    setLoading(true);
    setResult(null);
    setAnalysisCompleted(false);

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
        setAnalysisCompleted(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const totalClaims = result?.claims?.length || 0;

  const highRiskClaims = result?.risk_distribution?.High || 0;
  const mediumRiskClaims = result?.risk_distribution?.Medium || 0;
  const lowRiskClaims = result?.risk_distribution?.Low || 0;

  const pieData = result
    ? [
        { name: "High", value: highRiskClaims },
        { name: "Medium", value: mediumRiskClaims },
        { name: "Low", value: lowRiskClaims },
      ]
    : [];

  const exportToPDF =async () => {
    if (!result) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Fraud Analytics Report", 14, 20);

    doc.setFontSize(12);
    doc.text("Selected Rules:", 14, 30);
    selectedRules.forEach((rule, i) => {
      doc.text(`• ${rule.label}`, 18, 38 + i * 6);
    });

    let yOffset = 38 + selectedRules.length * 6 + 8;

    doc.text("Summary", 14, yOffset);
    autoTable(doc, {
  startY: yOffset + 4,
  head: [["Metric", "Value"]],
  body: [
    ["Total Claims", totalClaims],
    ["High Risk Claims", highRiskClaims],
    ["Medium Risk Claims", mediumRiskClaims],
    ["Low Risk Claims", lowRiskClaims],
  ],
});
 const chartElement = document.getElementById("risk-pie-chart");
  const canvas = await html2canvas(chartElement);
  const imgData = canvas.toDataURL("image/png");

  const chartHeight = 80;
const chartStartY = doc.lastAutoTable.finalY + 15;

doc.text("Claims Risk Distribution", 14, chartStartY);
doc.addImage(imgData, "PNG", 14, chartStartY + 5, 180, chartHeight);

const afterChartY = chartStartY + chartHeight + 20;

doc.text("Flagged Claims", 14, afterChartY);

autoTable(doc, {
  startY: afterChartY + 4,
  head: [["Claim ID", "Name", "Fraud Score", "Risk"]],
  body: result.claims.map((c) => [
    c.id,
    c.name,
    c.fraud_score,
    c.risk,
  ]),
});

    doc.save("fraud-analysis-report.pdf");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Header />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center mt-6">
          <h2 className="text-2xl font-bold">Fraud Risk Analytics</h2>
            <button
              onClick={exportToPDF}
              disabled={!analysisCompleted}
              className="bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Export Analysis
            </button>
          </div>

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
          </div>
          <button
              onClick={runAnalytics}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
              disabled={selectedRules.length === 0 || loading}
            >
              Run Analysis
            </button>
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
                  <p className="text-2xl font-bold text-yellow-600">
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

              <div id="risk-pie-chart" className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">
                  Claims Risk Distribution
                </h3>

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
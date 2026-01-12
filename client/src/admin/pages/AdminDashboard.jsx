import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FraudRateAnalysis from "../components/FraudRateAnalysis";
import RiskDistribution from "../components/RiskDistribution";
import TopTriggeredRules from "../components/TopTriggeredRules";
import {
  getDashboardSummary,
  createInvestigation,
} from "../services/adminApi";
import HighRiskAlert from "../components/HighRiskAlert";
// Date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function AdminDashboard({ darkMode, setDarkMode }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    claimId: "",
    investigator: "",
    priority: "Medium",
    notes: "",
    date: new Date(),
  });

  // =========================
  // FETCH DASHBOARD SUMMARY
  // =========================
  const fetchStats = async () => {
    try {
      const res = await getDashboardSummary();
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch admin dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // =========================
  // CREATE INVESTIGATION (REAL)
  // =========================
  const handleCreateInvestigation = async () => {
    if (!form.claimId || !form.investigator) {
      alert("Claim ID and Investigator are required");
      return;
    }

    setSubmitting(true);
    try {
      await createInvestigation(form);
      alert("Investigation created successfully");

      setShowModal(false);
      setForm({
        claimId: "",
        investigator: "",
        priority: "Medium",
        notes: "",
        date: new Date(),
      });

      // refresh dashboard after creation
      fetchStats();
    } catch (error) {
      console.error("Failed to create investigation", error);
      alert("Failed to create investigation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading admin dashboard...</div>;
  }

  // =========================
  // DB-BASED VALUES ONLY
  // =========================
  const totalClaims = stats?.total_claims ?? 0;
  const pendingClaims = stats?.status_counts?.pending ?? 0;
  const rejectedClaims = stats?.status_counts?.rejected ?? 0;
  const riskExposure = stats?.total_claim_amount ?? 0;

  const avgFraudScore =
    totalClaims > 0
      ? Math.round((rejectedClaims / totalClaims) * 100)
      : 0;

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <Sidebar />
      <div className="flex-1">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
              className="bg-purple-600 text-white px-4 py-2 w-40 rounded-md shadow hover:bg-purple-700"
              onClick={() => setShowModal(true)}
            >
              New Investigation
            </button>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SummaryCard title="Total Claims" value={totalClaims} />
            <SummaryCard title="Pending Claims" value={pendingClaims} />
            <SummaryCard
              title="Risk Exposure"
              value={`₹${riskExposure.toLocaleString()}`}
            />
            <SummaryCard
              title="Avg Fraud Score"
              value={`${avgFraudScore} / 100`}
            />
          </div>

          {/* High Risk Activity */}
          <HighRiskAlert />


          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-72">
              <FraudRateAnalysis />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-72">
              <RiskDistribution />
            </div>
          </div>

          {/* Top Triggered Rules */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-72">
            <TopTriggeredRules />
          </div>
        </div>
      </div>

      {/* =========================
          MODAL
      ========================= */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Start New Investigation
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Claim ID"
                value={form.claimId}
                onChange={(e) =>
                  setForm({ ...form, claimId: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-700"
              />

              <input
                placeholder="Investigator"
                value={form.investigator}
                onChange={(e) =>
                  setForm({ ...form, investigator: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-700"
              />

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-700"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <DatePicker
                selected={form.date}
                onChange={(date) => setForm({ ...form, date })}
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-700"
              />

              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-700"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                onClick={handleCreateInvestigation}
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// SMALL REUSABLE CARD
// =========================
function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

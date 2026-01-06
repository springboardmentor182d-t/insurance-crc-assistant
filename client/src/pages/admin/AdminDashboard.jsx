import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  IndianRupee,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

/* DASHBOARD COMPONENTS */
import StatCard from "../../components/AdminDashboard/StatCard";
import ClaimsBarChart from "../../components/AdminDashboard/ClaimsBarChart";
import FraudDonutChart from "../../components/AdminDashboard/FraudDonutChart";
import PayoutLineChart from "../../components/AdminDashboard/PayoutLineChart";
import SmallStatCard from "../../components/AdminDashboard/SmallStatCard";
import ExportDropdown from "../../components/AdminDashboard/ExportDropdown";

/* API BASE */
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  /* ================= FETCH ADMIN DASHBOARD ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/admin/dashboard`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then(setData)
      .catch(() => alert("Failed to load admin dashboard"));
  }, []);

  if (!data) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Monitor claims, payouts, and fraud detection
          </p>
        </div>

        <div className="flex gap-2">
          <ExportDropdown />

          {/* FRAUD CASES BUTTON */}
          <button
            onClick={() => navigate("/admin/fraud")}
            className="inline-flex items-center gap-2
                       bg-red-500 hover:bg-red-600
                       text-white text-sm px-4 py-2 rounded-lg shadow-sm"
          >
            <AlertOctagon size={16} />
            View Fraud Cases
          </button>
        </div>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Claims"
          value={data.total_claims}
          growth={data.claims_growth_pct}
          icon={FileText}
          color="bg-blue-500"
        />

        <StatCard
          title="Total Payouts"
          value={`₹${data.total_payouts}M`}
          growth={data.payout_growth_pct}
          icon={IndianRupee}
          color="bg-green-500"
        />

        <StatCard
          title="Active Policies"
          value={data.active_policies}
          growth={data.policies_growth_pct}
          icon={ShieldCheck}
          color="bg-yellow-500"
        />

        <StatCard
          title="Fraud Cases"
          value={data.fraud_cases}
          growth={data.fraud_growth_pct}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-sm">
          <ClaimsBarChart data={data.claims_overview} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <FraudDonutChart data={data.fraud_stats} />
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
        <PayoutLineChart data={data.monthly_payouts} />
      </div>

      {/* ================= BOTTOM STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <SmallStatCard
          title="Total Users"
          value={data.total_users}
          icon={Users}
          color="bg-blue-500"
        />

        <SmallStatCard
          title="Avg Settlement Time"
          value={`${data.avg_settlement_days} days`}
          icon={Clock}
          color="bg-green-500"
        />

        <SmallStatCard
          title="Claim Settlement %"
          value={data.settlement_rate}
          icon={CheckCircle}
          color="bg-emerald-500"
        />
      </div>

    </div>
  );
}

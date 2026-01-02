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

import StatCard from "../components/AdminDashboard/StatCard";
import ClaimsBarChart from "../components/AdminDashboard/ClaimsBarChart";
import FraudDonutChart from "../components/AdminDashboard/FraudDonutChart";
import PayoutLineChart from "../components/AdminDashboard/PayoutLineChart";
import SmallStatCard from "../components/AdminDashboard/SmallStatCard";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(() => alert("Failed to load admin data"));
  }, []);

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER + FRAUD BUTTON */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Monitor claims, payouts, and fraud detection
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/fraud-cases")}
          className="mt-4 md:mt-0 inline-flex items-center gap-2
                     bg-red-500 hover:bg-red-600
                     text-white text-sm font-medium
                     px-4 py-2 rounded-lg
                     shadow-sm transition-all
                     focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <AlertOctagon size={18} />
          View Fraud Cases
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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

      {/* CLAIMS + FRAUD CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ClaimsBarChart data={data.claims_overview} />
        </div>

        <FraudDonutChart data={data.fraud_stats} />
      </div>

      {/* PAYOUT LINE CHART */}
      <PayoutLineChart data={data.monthly_payouts} />

      {/* BOTTOM STATS */}
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

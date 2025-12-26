import { useEffect, useState } from "react";

import StatCard from "../components/AdminDashboard/StatCard";
import ClaimsBarChart from "../components/AdminDashboard/ClaimsBarChart";
import FraudDonutChart from "../components/AdminDashboard/FraudDonutChart";
import PayoutLineChart from "../components/AdminDashboard/PayoutLineChart";
import SmallStatCard from "../components/AdminDashboard/SmallStatCard";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/dashboard")
      .then(res => res.json())
      .then(setData)
      .catch(() => alert("Failed to load admin data"));
  }, []);

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Monitor claims, payouts, and fraud detection
          </p>
        </div>

        <button className="bg-red-500 hover:bg-red-600
          text-white px-4 py-2 rounded-lg text-sm
          transition-all duration-300 hover:scale-105">
          🚨 View Fraud Cases
        </button>
      </div>

      {/* TOP KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Claims" value={data.total_claims}
          subText="+12% from last month" icon="📄" iconBg="bg-blue-100" />
        <StatCard title="Total Payouts" value={`₹${data.total_payouts}M`}
          subText="+8% from last month" icon="💰" iconBg="bg-green-100" />
        <StatCard title="Active Policies" value={data.active_policies}
          subText="+5% from last month" icon="🛡️" iconBg="bg-yellow-100" />
        <StatCard title="Fraud Cases" value={data.fraud_cases}
          subText="-3% from last month" icon="⚠️" iconBg="bg-red-100" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ClaimsBarChart data={data.claims_overview} />
        </div>
        <FraudDonutChart data={data.fraud_stats} />
      </div>

      <PayoutLineChart data={data.monthly_payouts} />

      {/* BOTTOM SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <SmallStatCard title="Total Users"
          value={data.total_users} subText="+24 this month" icon="👥" />
        <SmallStatCard title="Avg Settlement Time"
          value={`${data.avg_settlement_days} days`}
          subText="0.5 days improvement" icon="⏱️" />
        <SmallStatCard title="Claim Settlement %"
          value={data.settlement_rate}
          subText="+1.3% from last quarter" icon="✅" />
      </div>

    </div>
  );
}

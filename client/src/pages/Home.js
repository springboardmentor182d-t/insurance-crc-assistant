import { useEffect, useState } from "react";

import PremiumChart from "../components/dashboard/PremiumChart";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import MyPolicies from "../components/dashboard/MyPolicies";
import ClaimsTable from "../components/dashboard/ClaimsTable";
import StatsCard from "../components/dashboard/StatsCard";

import { fetchDashboardData } from "../features/authentication/services/dashboardApi";

export default function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const userId = 1;

  useEffect(() => {
    fetchDashboardData(userId)
      .then((data) => {
        console.log("Dashboard data:", data); // debug backend response
        setDashboard(data);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard");
      });
  }, [userId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  // -----------------------
  // Safe access to backend data
  // -----------------------
  const user = dashboard.user || {};
  const policies = dashboard.policies || [];
  const claims = dashboard.claims || [];
  const premiumAnalysis = dashboard.premiumAnalysis || [];
  const recommendations = dashboard.recommendations || [];

  // -----------------------
  // Chart data
  // -----------------------
  const chartData = policies.map((policy) => ({
    category: policy.name || "N/A",
    yourPremium: Number(policy.premium) || 0,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-6 pb-6 space-y-6">

        {/* Top section: Premium chart + Profile summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PremiumChart data={chartData} />
          </div>
          <ProfileSummary profile={user} />
        </div>

        {/* Policies section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MyPolicies policies={policies} />
          </div>
        </div>

        {/* Stats and claims */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsCard policies={policies} />
          <ClaimsTable claims={claims} policies={policies} />
        </div>

      </main>
    </div>
  );
}

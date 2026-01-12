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
      .then((data) => setDashboard(data))
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard");
      });
  }, [userId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  const chartData = dashboard.policies.map((policy) => ({
    category: policy.policy_type,
    yourPremium: Number(policy.premium_amount),
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-6 pb-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PremiumChart data={chartData} />
          </div>
          <ProfileSummary profile={dashboard.user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MyPolicies policies={dashboard.policies} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsCard policies={dashboard.policies} />
          <ClaimsTable
            claims={dashboard.claims || []}
            policies={dashboard.policies}
          />
        </div>
      </main>
    </div>
  );
}

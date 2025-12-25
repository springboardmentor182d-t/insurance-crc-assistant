import { useEffect, useState } from "react";
import PremiumChart from "../components/dashboard/PremiumChart";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import MyPolicies from "../components/dashboard/MyPolicies";
import RecommendedPolicies from "../components/dashboard/RecommendedPolicies";
import ClaimsTable from "../components/dashboard/ClaimsTable";
import StatsCard from "../components/dashboard/StatsCard";
import { fetchDashboardData } from "../features/authentication/services/dashboardApi";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";  // need to check

export default function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const userId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData(userId)
      .then(setDashboard)
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  const chartData = dashboard.policies.map((p) => ({
    category: p.policy_type,
    yourPremium: p.premium,
    marketAvg: dashboard.market_avg?.[p.policy_type] || 0,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Top Bar */}
        <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
        {/* Search Bar */}
        {/* <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search policies, claims..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Notifications + Quote */}
        {/* <div className="flex items-center gap-4 ml-6">
          <div className="relative">
            <FiBell className="text-xl text-gray-600 cursor-pointer" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div> */}
      </div>

      {/* ✅ Dashboard Content */}
      <main className="pt-0 px-6 pb-6 space-y-6">
        {/* <h1 className="text-2xl font-bold text-gray-800">
          Dashboard – Welcome back, {dashboard.profile?.name || "User"}! Here’s your insurance portfolio status.
        </h1> */}

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PremiumChart data={chartData} />
          </div>
          <ProfileSummary profile={dashboard.profile} />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MyPolicies policies={dashboard.policies} />
          </div>
          <RecommendedPolicies
            recommendations={dashboard.recommendations}
            onViewDetails={(id) => navigate(`/recommendations/${id}`)}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsCard policies={dashboard.policies} />
          <ClaimsTable claims={dashboard.claims} policies={dashboard.policies} />
        </div>
      </main>
    </div>
  );
}
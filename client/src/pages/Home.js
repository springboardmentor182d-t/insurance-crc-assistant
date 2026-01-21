import { useEffect, useState } from "react";
import PremiumChart from "../components/dashboard/PremiumChart";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import MyPolicies from "../components/dashboard/MyPolicies";
import RecommendedPolicies from "../components/dashboard/RecommendedPolicies";
import ClaimsTable from "../components/dashboard/ClaimsTable";
import StatsCard from "../components/dashboard/StatsCard";
import { fetchDashboardData } from "../features/authentication/services/dashboardApi";
import { useNavigate } from "react-router-dom";

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

  const chartData = dashboard.premium_analysis || [];

  return (
    <div
      className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black"
      >
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-3  backdrop-blur shadow-sm" />

      {/* Dashboard Content */}
      <main className="pt-0 px-6 pb-6 space-y-6">
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
            <MyPolicies policies={dashboard.policies || []} />
          </div>
          <RecommendedPolicies
            recommendations={dashboard.recommendations || []}
            onViewDetails={(id) => navigate(`/recommendations/${id}`)}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsCard policies={dashboard.policies || []} />
          <ClaimsTable
            claims={dashboard.claims || []}
            policies={dashboard.policies || []}
          />
        </div>
      </main>
    </div>
  );
}

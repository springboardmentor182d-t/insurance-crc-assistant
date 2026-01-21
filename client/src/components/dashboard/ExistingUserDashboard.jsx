import PremiumChart from "./PremiumChart";
import ProfileSummary from "./ProfileSummary";
import MyPolicies from "./MyPolicies";
import RecommendedPolicies from "./RecommendedPolicies";
import ClaimsTable from "./ClaimsTable";
import StatsCard from "./StatsCard";
import { useNavigate } from "react-router-dom";

export default function ExistingUserDashboard({ dashboard }) {
  const navigate = useNavigate();

  const chartData = dashboard?.premium_analysis || [];
  const fullName = dashboard?.profile?.username || "User";

  return (
    <div
      className="min-h-screen px-6 py-6"
      style={{
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ffffff 100%)",
      }}
    >
      {/* ================= WELCOME HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, <span className="text-indigo-600">{fullName}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here’s a snapshot of your insurance journey with InsureAssist
        </p>
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <main className="space-y-6">
        {/* ================= ROW 1 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PREMIUM CHART */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-4">
            {chartData.length > 0 ? (
              <PremiumChart data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                Premium insights will appear once we analyze your profile
              </div>
            )}
          </div>

          {/* PROFILE SUMMARY */}
          <div className="bg-white rounded-xl shadow-sm border">
            <ProfileSummary profile={dashboard.profile} />
          </div>
        </div>

        {/* ================= ROW 2 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ACTIVE POLICIES */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-4">
            <MyPolicies policies={dashboard.policies || []} />
          </div>

          {/* RECOMMENDATIONS */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <RecommendedPolicies
              recommendations={dashboard.recommendations || []}
              onViewDetails={(id) => navigate(`/recommendations/${id}`)}
            />
          </div>
        </div>

        {/* ================= ROW 3 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* STATS */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <StatsCard policies={dashboard.policies || []} />
          </div>

          {/* CLAIMS */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <ClaimsTable
              claims={dashboard.claims || []}
              policies={dashboard.policies || []}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

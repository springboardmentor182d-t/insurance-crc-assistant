import PremiumChart from "./PremiumChart";
import ProfileSummary from "./ProfileSummary";
import MyPolicies from "./MyPolicies";
import RecommendedPolicies from "./RecommendedPolicies";
import ClaimsTable from "./ClaimsTable";
import ActivePolicyCard from "./MyActivePolicies";
import { useNavigate } from "react-router-dom";

export default function ExistingUserDashboard({ dashboard }) {
  const navigate = useNavigate();

  const chartData = dashboard?.premium_analysis || [];
  const fullName = dashboard?.profile?.username || "User";

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* ================= WELCOME HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome back,{" "}
          <span className="text-[var(--accent)]">{fullName}</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Here’s a snapshot of your insurance journey with InsureAssist
        </p>
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <main className="space-y-6">
        {/* ================= ROW 1 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PREMIUM CHART */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            {chartData.length > 0 ? (
              <PremiumChart data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-[var(--text-muted)]">
                Premium insights will appear once we analyze your profile
              </div>
            )}
          </div>

          {/* PROFILE SUMMARY */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
            <ProfileSummary profile={dashboard.profile} />
          </div>
        </div>

        {/* ================= ROW 2 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ACTIVE POLICIES */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            <MyPolicies policies={dashboard.policies || []} />
          </div>

          {/* RECOMMENDATIONS */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            <RecommendedPolicies
              recommendations={dashboard.recommendations || []}
              onViewDetails={(id) => navigate(`/recommendations/${id}`)}
            />
          </div>
        </div>

        {/* ================= ROW 3 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivePolicyCard />

          {/* CLAIMS */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
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

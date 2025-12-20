import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import StatsCard from "../components/dashboard/StatsCard";
import PoliciesTable from "../components/dashboard/PoliciesTable";
import ClaimsTable from "../components/dashboard/ClaimsTable";
import PremiumChart from "../components/dashboard/PremiumChart";
import { fetchDashboardData } from "../features_authentication/services/dashboardApi";

export default function UserDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  // TODO: Replace with userId from your auth context once available
  const userId = 1;

  useEffect(() => {
    fetchDashboardData(userId)
      .then(setDashboard)
      .catch((err) => setError(err?.response?.data?.detail || "Failed to load"));
  }, [userId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Welcome back, {dashboard.user.username}! Here’s your insurance portfolio status.
          </h1>
          <div className="flex gap-2">
            <input
              className="border rounded px-3 py-2 text-sm"
              placeholder="Search policies, claims..."
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Get a Quote</button>
          </div>
        </div>

        <PremiumChart policies={dashboard.policies} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <PoliciesTable policies={dashboard.policies} />
            <ClaimsTable claims={dashboard.claims} />
          </div>
          <div className="md:col-span-1">
            <StatsCard policies={dashboard.policies} />
          </div>
        </div>
      </main>
    </div>
  );
}
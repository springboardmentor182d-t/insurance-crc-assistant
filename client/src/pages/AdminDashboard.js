import { useEffect, useState } from "react";
import {
  useAdminApi,
  getFraudSummary,
  exportFraudCSV,
} from "../utils/fraudApi";

import PoliciesOverview from "../components/dashboard/PoliciesOverview";
import ClaimsOverview from "../components/dashboard/ClaimsOverview";
import InvestigationsOverview from "../components/dashboard/InvestigationsOverview";

import FraudSummaryCards from "../components/dashboard/FraudSummaryCards";
import FraudAlertBanner from "../components/dashboard/FraudAlertBanner";
import FraudRateChart from "../components/dashboard/FraudRateChart";
import RiskDistribution from "../components/dashboard/RiskDistribution";
import TopTriggeredRules from "../components/dashboard/TopTriggeredRules";

export default function AdminDashboard() {
  const api = useAdminApi(); // ✅ REQUIRED for admin auth
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getFraudSummary(api); // ✅ PASS api
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [api]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Failed to load dashboard</div>;

  return (
    <div
      className="min-h-screen
                 bg-gradient-to-br
                 from-slate-100 via-blue-50 to-indigo-100
                 dark:from-gray-950 dark:via-gray-900 dark:to-black"
    >
      <main className="px-6 pb-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>

          <button
            onClick={() => exportFraudCSV(api)} // ✅ PASS api
            className="inline-flex items-center justify-center
                       px-4 py-2 text-sm font-medium
                       rounded-lg
                       bg-indigo-600 text-white
                       hover:bg-indigo-700 transition
                       shadow-sm"
          >
            Export CSV
          </button>
        </div>

        {/* Overviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PoliciesOverview data={data} />
          <ClaimsOverview data={data} />
          <InvestigationsOverview data={data} />
        </div>

        {/* Summary Cards */}
        <FraudSummaryCards data={data} />

        {/* Alert */}
        <FraudAlertBanner />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <FraudRateChart trend={data.trend} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <RiskDistribution data={data.risk_distribution} />
            <TopTriggeredRules rules={data.top_rules} />
          </div>
        </div>
      </main>
    </div>
  );
}

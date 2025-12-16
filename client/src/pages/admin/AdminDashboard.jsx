import Sidebar from "../../components/sidebar/AdminSidebar";
import FraudChart from "../../components/FraudChart";
import RiskDistribution from "../../components/RiskDistribution";
import TriggeredRulesChart from "../../components/TriggeredRulesChart";

export default function AdminDashboard() {
  const metrics = [
    {
      label: "Total Claims",
      value: "1,240 today",
      change: "↑ 5.2%",
      status: null,
      color: "text-green-600",
    },
    {
      label: "Flagged Claims",
      value: "85",
      change: "↑ 12",
      status: "Action Needed",
      color: "text-red-600",
    },
    {
      label: "Risk Exposure",
      value: "$450k est.",
      change: null,
      status: "Pending",
      color: "text-yellow-500",
    },
    {
      label: "Avg Fraud Score",
      value: "42 /100",
      change: null,
      status: "Stable",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <main className="flex-1 bg-gray-50 p-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Oct 24, 2023</p>
            <h1 className="text-2xl font-bold">Fraud & Analytics Dashboard</h1>
            <p className="text-sm text-gray-500">
              Monitoring system performance and fraud detection across 12 regions.
            </p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            New Investigation
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
              {item.change && <p className={`${item.color} text-sm`}>{item.change}</p>}
              {item.status && <p className="text-xs text-gray-400">{item.status}</p>}
            </div>
          ))}
        </div>

        {/* Alert Box */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <h4 className="font-semibold text-red-700">High Risk Activity Detected</h4>
          <p className="text-sm text-red-600">
            7 new claims flagged as HIGH RISK in the last hour. Duplicate documents detected.
          </p>
          <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm">
            View Alerts
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fraud Chart */}
          <div className="bg-white p-6 rounded-lg shadow h-400 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Fraud Rate Analysis</h3>
            <p className="text-sm text-gray-500 mb-4">
              Claims vs Flagged Incidents (Last 7 Days)
            </p>
            <div className="flex-1">
              <FraudChart />
            </div>
          </div>

          {/* Risk Distribution */}
          <RiskDistribution />
        </div>

        {/* Triggered Rules */}
        <TriggeredRulesChart />
      </main>
    </div>
  );
}
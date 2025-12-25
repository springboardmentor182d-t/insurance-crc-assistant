import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PremiumChart({ data = [] }) {
  const [mode, setMode] = useState("annual");

  // Group data by frequency and category, aggregate if multiple rows exist
  const grouped = data.reduce((acc, item) => {
    const freq = (item.frequency || "").toLowerCase();
    const cat = (item.category || "").toLowerCase();

    if (!acc[freq]) acc[freq] = {};
    if (!acc[freq][cat]) acc[freq][cat] = { market: 0, user: 0 };

    acc[freq][cat].market += Number(item.market_cost) || 0;
    acc[freq][cat].user += Number(item.user_cost) || 0;

    return acc;
  }, {});

  const chartData = grouped[mode] || {};

  // Format for Recharts
  const formatted = ["auto", "home", "health", "life"].map((type) => ({
    category: type.charAt(0).toUpperCase() + type.slice(1),
    MarketAvg: chartData[type]?.market || 1000,
    YourPremium: chartData[type]?.user || 1500,  // inserted values
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Premium Analysis</h3>
          <p className="text-sm text-gray-500">
            Your {mode} costs vs. market average
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("annual")}
            className={`px-3 py-1 rounded text-sm ${
              mode === "annual" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Annually
          </button>
          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 rounded text-sm ${
              mode === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formatted} barCategoryGap="30%">
          <XAxis dataKey="category" />
          <YAxis domain={[0, 3500]} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="YourPremium"
            fill="#3b82f6"
            name="Your Premium"
            barSize={20}
          />
          <Bar
            dataKey="MarketAvg"
            fill="#8b5cf6"
            name="Market Avg"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
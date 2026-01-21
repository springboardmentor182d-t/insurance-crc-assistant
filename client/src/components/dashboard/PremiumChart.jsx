import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Simple label formatter (no "Insurance")
const formatLabel = (category) => category;

export default function PremiumChart({ data = [] }) {
  // Build chart data ONLY from backend data
  const chartData = data.map((item) => ({
    category: formatLabel(item.category),
    user_cost: item.user_cost,
    market_cost: item.market_cost,
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-sm text-gray-500">
        No premium analysis available yet.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-1">
        Premium Analysis (Your Cost vs Market)
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Monthly comparison based on your selected insurance preferences
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} barCategoryGap="30%">
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Legend />

          <Bar
            dataKey="market_cost"
            name="Market Avg"
            fill="#8b5cf6"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />
          <Bar
            dataKey="user_cost"
            name="Your Budget"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

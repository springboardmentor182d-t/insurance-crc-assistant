import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function FraudRateChart({ trend }) {
  if (!trend || trend.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow h-[360px] border border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          Fraud Rate Analysis
        </h2>
        <p className="text-sm text-gray-400 mt-6 text-center">
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow h-[360px] border border-gray-200 dark:border-gray-800">
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          Fraud Rate Analysis
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Claims vs Flagged (Last 7 Days)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={trend}>
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.25)"
          />

          {/* X Axis */}
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          {/* 🔥 FIXED TOOLTIP */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#f9fafb",
            }}
            labelStyle={{
              color: "#e5e7eb",
              fontWeight: 600,
            }}
            itemStyle={{
              color: "#f9fafb",
            }}
          />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#6366f1"
            fill="url(#totalGradient)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="flagged"
            stroke="#ef4444"
            fill="transparent"
            strokeDasharray="4 4"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

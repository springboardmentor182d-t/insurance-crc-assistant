import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PayoutLineChart({ data }) {

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl border shadow-sm mt-6">
        <h3 className="font-semibold mb-4">
          Monthly Payouts (₹ Millions)
        </h3>
        <p className="text-sm text-gray-500">No payout data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm mt-6">
      <h3 className="font-semibold mb-4">
        Monthly Payouts (₹ Millions)
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function PayoutLineChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm mt-6">
      <h3 className="font-semibold mb-3">
        Monthly Payouts (₹ Millions)
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

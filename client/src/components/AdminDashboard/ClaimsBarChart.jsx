import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function ClaimsBarChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm">
      <h3 className="font-semibold mb-3">Claims Overview</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="rejected" fill="#ef4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { rule: "High Claim Amount", count: 42 },
  { rule: "Multiple Claims", count: 31 },
  { rule: "Location Mismatch", count: 18 },
  { rule: "Late Night Filing", count: 25 },
  { rule: "Duplicate Policy", count: 12 },
];

export default function TriggeredRulesChart() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Triggered Fraud Rules
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            barSize={18}   // 👈 thinner bars
            margin={{ left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="rule"
              type="category"
              width={140}
            />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#8b5cf6"   // 👈 Purple (Tailwind violet-500)
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

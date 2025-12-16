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
  { month: "Jan", fraud: 12 },
  { month: "Feb", fraud: 18 },
  { month: "Mar", fraud: 9 },
  { month: "Apr", fraud: 22 },
  { month: "May", fraud: 16 },
  { month: "Jun", fraud: 25 },
];

export default function FraudChart() {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-6">
        Fraud Claims Overview
      </h2>

      {/* Chart container */}
      <div className="w-full" style={{ height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="fraud"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
  
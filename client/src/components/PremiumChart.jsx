import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { name: "Auto", market: 1500, yours: 1200 },
  { name: "Home", market: 900, yours: 800 },
  { name: "Health", market: 3200, yours: 2900 },
  { name: "Life", market: 900, yours: 600 },
];

export default function PremiumAnalysisChart() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Premium Analysis</h2>
          <p className="text-sm text-gray-500">
            Your annual costs vs. market average
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600">
            Annually
          </button>
          <button className="px-3 py-1 text-sm rounded-full border">
            Monthly
          </button>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer>
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="market" fill="#c084fc" radius={[6, 6, 0, 0]} />
            <Bar dataKey="yours" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

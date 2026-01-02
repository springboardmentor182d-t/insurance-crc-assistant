import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function FraudDonutChart({ data }) {

  // Safety guard – prevents NaN & crashes
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-4">Fraud Detection</h3>
        <p className="text-sm text-gray-500">No fraud data available</p>
      </div>
    );
  }

  const total = data.reduce(
    (sum, item) => sum + (Number(item.value) || 0),
    0
  );

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm">
      <h3 className="font-semibold mb-4">Fraud Detection</h3>

      <div className="relative">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold">{total}%</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.name}</span>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

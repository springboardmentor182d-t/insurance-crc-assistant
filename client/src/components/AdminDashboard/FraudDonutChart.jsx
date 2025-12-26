import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function FraudDonutChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm
      hover:shadow-md transition-all duration-300">

      <h3 className="font-semibold mb-4">Fraud Detection</h3>

      {/* CHART */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              animationDuration={1400}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex flex-col
          items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold">{total}%</p>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-gray-600">{item.name}</span>
            </div>

            <span className="font-medium text-gray-700">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

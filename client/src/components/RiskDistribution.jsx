import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Low Risk", value: 60 },
  { name: "Medium Risk", value: 25 },
  { name: "High Risk", value: 15 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function RiskDistribution() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Risk Distribution
      </h2>

      {/* Fixed height is IMPORTANT */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 text-sm">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

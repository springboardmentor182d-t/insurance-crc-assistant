export default function PremiumCoverageAnalysis({ data }) {
  // 🔐 SAFETY GUARD
  if (!data?.policy) return null;

  const premium = Number(data.policy.premium || 0);
  const coverage = Number(data.policy.coverage || 0);
  const valueScore = data.valueScore ?? 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-5">
        Premium vs Coverage Analysis
      </h2>

      <Bar
        label="Coverage Amount"
        value={`₹ ${coverage.toLocaleString("en-IN")}`}
        width="80%"
        color="bg-green-500"
      />

      <Bar
        label="Annual Premium"
        value={`₹ ${premium.toLocaleString("en-IN")}`}
        width="45%"
        color="bg-blue-500"
      />

      <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm">
        Value Score (Coverage / Premium):{" "}
        <strong>{valueScore}x</strong>
      </div>
    </div>
  );
}

function Bar({ label, value, width, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded ${color}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default function PremiumCoverageAnalysis({ data }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-5">
        Premium vs Coverage Analysis
      </h2>

      <Bar
        label="Coverage Amount"
        value={`₹ ${data.coverage.toLocaleString()}`}
        width="80%"
        color="bg-green-500"
      />

      <Bar
        label="Annual Premium"
        value={`₹ ${data.premium.toLocaleString()}`}
        width="45%"
        color="bg-blue-500"
      />

      <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm">
        Value Score (Coverage / Premium): <strong>{data.valueScore}x</strong>
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
        <div className={`h-2 rounded ${color}`} style={{ width }} />
      </div>
    </div>
  );
}

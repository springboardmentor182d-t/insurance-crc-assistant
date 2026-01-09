export default function MarketComparison({ market = {} }) {
  if (!market.premium && !market.coverage && !market.benefits) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">vs Market Average</h2>

      <ComparisonRow
        label="Premium"
        value={market.premium}
        suffix="% Lower"
      />

      <ComparisonRow
        label="Coverage"
        value={market.coverage}
        suffix="% Higher"
      />

      <ComparisonRow
        label="Benefits"
        value={market.benefits}
        suffix="% More"
      />
    </div>
  );
}

function ComparisonRow({ label, value, suffix }) {
  if (value == null) return null;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-green-600">
          {value}{suffix}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

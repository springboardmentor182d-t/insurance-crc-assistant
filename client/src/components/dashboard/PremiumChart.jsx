export default function PremiumChart({ policies = [] }) {
  // Compute totals by type for a simple bar representation (can swap to Chart.js later)
  const data = policies.reduce((acc, p) => {
    acc[p.policy_type] = (acc[p.policy_type] || 0) + (Number(p.premium) || 0);
    return acc;
  }, {});
  const entries = Object.entries(data);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Premium analysis</h2>
        <div className="text-sm text-gray-500">Annually / Monthly</div>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500 mt-2">No policy data available.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {entries.map(([type, sum]) => (
            <div key={type}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{type}</span>
                <span>${sum}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-600 rounded"
                  style={{ width: `${Math.min(100, (sum / 300) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
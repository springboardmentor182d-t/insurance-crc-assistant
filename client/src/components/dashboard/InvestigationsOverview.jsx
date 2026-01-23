export default function InvestigationsOverview({ data }) {
  // 🔒 SAFELY extract array no matter what comes in
  const investigations = Array.isArray(data)
    ? data
    : Array.isArray(data?.investigations)
    ? data.investigations
    : [];

  const total = investigations.length;

  const high = investigations.filter(
    i => i.priority === "High"
  ).length;

  const medium = investigations.filter(
    i => i.priority === "Medium"
  ).length;

  const low = investigations.filter(
    i => i.priority === "Low"
  ).length;

  return (
    <div className="bg-white rounded-xl p-5 border">
      <h3 className="text-sm font-semibold mb-4 text-gray-700">
        Investigations Overview
      </h3>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-red-600">{high}</p>
          <p className="text-xs text-gray-500">High</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-yellow-500">{medium}</p>
          <p className="text-xs text-gray-500">Medium</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-green-600">{low}</p>
          <p className="text-xs text-gray-500">Low</p>
        </div>
      </div>
    </div>
  );
}

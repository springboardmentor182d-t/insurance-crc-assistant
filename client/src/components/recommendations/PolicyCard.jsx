import PolicyInfoBox from "./PolicyInfoBox";

export default function PolicyCard({ policy }) {
  const bg =
    policy.color === "red"
      ? "bg-red-50"
      : policy.color === "blue"
      ? "bg-blue-50"
      : "bg-orange-50";

  const border =
    policy.color === "red"
      ? "border-red-400 text-red-500"
      : policy.color === "blue"
      ? "border-blue-400 text-blue-500"
      : "border-orange-400 text-orange-500";

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden flex">
      {/* SCORE */}
      <div className={`w-32 flex flex-col items-center justify-center ${bg}`}>
        {policy.best && (
          <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full mb-3">
            Best Match
          </span>
        )}
        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-semibold ${border}`}>
          {policy.score}%
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-gray-100 p-2 rounded-lg">{policy.icon}</div>
          <div>
            <h3 className="font-semibold text-lg">{policy.title}</h3>
            <p className="text-sm text-gray-500">{policy.provider}</p>
          </div>
        </div>

        <p className="text-sm text-orange-600 mt-2">↗ {policy.highlight}</p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <PolicyInfoBox label="Annual Premium" value={`₹ ${policy.premium.toLocaleString()}`} />
          <PolicyInfoBox label="Coverage" value={`₹ ${policy.coverage.toLocaleString()}`} />
          <PolicyInfoBox label="Potential Savings" value={`₹ ${policy.savings.toLocaleString()}`} highlight />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="w-52 p-6 flex flex-col gap-3 justify-center">
        <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View Details
        </button>
        <button className="border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50">
          Compare
        </button>
        <button className="text-sm text-gray-500 hover:underline">
          Save for Later
        </button>
      </div>
    </div>
  );
}

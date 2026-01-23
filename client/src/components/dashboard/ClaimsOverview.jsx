export default function ClaimsOverview({ data }) {
  return (
    <div className="bg-white rounded-xl p-5 border">
      <h3 className="text-sm font-semibold mb-4 text-gray-700">
        Claims Overview
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">
        {/* TOTAL CLAIMS */}
        <div>
          <p className="text-2xl font-bold">
            {data?.total_claims ?? 0}
          </p>
          <p className="text-xs text-gray-500">Total Claims</p>
        </div>

        {/* HIGH RISK */}
        <div>
          <p className="text-2xl font-bold text-orange-500">
            {data?.risk_distribution?.high ?? 0}
          </p>
          <p className="text-xs text-gray-500">High Risk</p>
        </div>

        {/* FLAGGED */}
        <div>
          <p className="text-2xl font-bold text-red-600">
            {data?.flagged_claims ?? 0}
          </p>
          <p className="text-xs text-gray-500">Flagged</p>
        </div>
      </div>
    </div>
  );
}

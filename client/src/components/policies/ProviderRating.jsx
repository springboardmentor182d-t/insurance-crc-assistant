export default function ProviderRating({
  claimSettlement,
  customerService,
  tatDays,
}) {
  // -----------------------------
  // SAFE NORMALIZATION
  // -----------------------------
  const settlement =
    typeof claimSettlement === "number"
      ? Math.min(Math.max(claimSettlement, 0), 100)
      : null;

  const service =
    typeof customerService === "number"
      ? customerService
      : null;

  const tat =
    typeof tatDays === "number"
      ? tatDays
      : null;

  // -----------------------------
  // TAT COLOR LOGIC
  // -----------------------------
  const tatColor =
    tat == null
      ? "text-slate-400"
      : tat <= 7
      ? "text-green-600"
      : tat <= 14
      ? "text-orange-500"
      : "text-red-500";

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h3 className="font-semibold mb-4">
        Provider Rating
      </h3>

      <div className="space-y-4 text-sm">

        {/* CLAIM SETTLEMENT */}
        <div>
          <div className="flex justify-between mb-1">
            <span>Claim Settlement</span>
            <span className="font-medium text-blue-600">
              {settlement !== null
                ? `${settlement}%`
                : "—"}
            </span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{
                width:
                  settlement !== null
                    ? `${settlement}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        {/* CUSTOMER SERVICE */}
        <div className="flex justify-between">
          <span>Customer Service</span>
          <span className="font-medium text-blue-600">
            {service !== null
              ? `${service}/5`
              : "—"}
          </span>
        </div>

        {/* TAT */}
        <div className="flex justify-between">
          <span>TAT (Days)</span>
          <span className={`font-medium ${tatColor}`}>
            {tat !== null ? tat : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

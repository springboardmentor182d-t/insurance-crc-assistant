export default function FraudSummaryCards({ data }) {
  const cards = [
    {
      label: "Total Claims",
      value: data.total_claims,
      sub: "Today",
    },
    {
      label: "Flagged Claims",
      value: data.flagged_claims,
      sub: "Action Needed",
    },
    {
      label: "Risk Exposure",
      value: `$${data.risk_exposure || 0}k`,
      sub: "Estimated",
    },
    {
      label: "Avg Fraud Score",
      value: `${data.avg_fraud_score}/100`,
      sub: "Stable",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="
            p-5 rounded-2xl
            border
            transition hover:shadow-md

            bg-white text-gray-900 border-gray-100
            dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {c.label}
          </p>

          <p className="text-3xl font-bold mt-1">
            {c.value}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

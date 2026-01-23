export default function FraudSummaryCards({ data }) {
  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const hasRiskExposure = data?.risk_exposure && data.risk_exposure > 0;
  const hasAvgScore = data?.avg_fraud_score && data.avg_fraud_score > 0;

  const cards = [
    {
      label: "Risk Exposure",
      value: hasRiskExposure
        ? formatINR(data.risk_exposure)
        : "₹0",
      sub: hasRiskExposure
        ? "Amount at risk from flagged claims"
        : "No current financial risk detected",
    },
    {
      label: "Avg Fraud Score",
      value: hasAvgScore
        ? `${data.avg_fraud_score}`
        : "0",
      sub: hasAvgScore
        ? "Overall fraud risk level"
        : "No fraud risk detected",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur
                     border border-gray-100
                     p-8 rounded-2xl
                     hover:shadow-md transition
                     flex flex-col justify-center"
        >
          <p className="text-sm text-gray-500">
            {c.label}
          </p>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {c.value}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

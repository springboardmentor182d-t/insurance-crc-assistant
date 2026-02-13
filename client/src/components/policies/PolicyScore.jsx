export default function PolicyScore({ score }) {
  // -----------------------------
  // SAFETY FALLBACK
  // -----------------------------
  const normalizedScore =
    typeof score === "number" ? score : null;

  // -----------------------------
  // LABEL BASED ON SCORE
  // -----------------------------
  const getLabel = (value) => {
    if (value >= 9) return "Excellent Choice";
    if (value >= 8) return "Highly Recommended";
    if (value >= 7) return "Good Value";
    return "Average";
  };

  const label = normalizedScore
    ? getLabel(normalizedScore)
    : "Score unavailable";

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">
      <h3 className="font-semibold mb-3">Policy Score</h3>

      {/* SCORE CIRCLE */}
      <div
        className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center font-bold text-white
          ${
            normalizedScore >= 8
              ? "bg-blue-600"
              : "bg-slate-400"
          }`}
      >
        {normalizedScore ? `${normalizedScore}/10` : "—"}
      </div>

      {/* LABEL */}
      <p className="text-sm text-slate-500 mt-2">
        {label}
      </p>
    </div>
  );
}

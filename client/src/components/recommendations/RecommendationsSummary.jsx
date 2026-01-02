export default function RecommendationsSummary({ summary }) {
  return (
    <div className="max-w-5xl mx-auto mb-10">
      <div className="bg-blue-50 border rounded-xl grid grid-cols-3 text-center py-6">
        <Item value={summary.matched} label="Policies Matched" color="text-blue-600" />
        <Item value={`₹ ${summary.savings.toLocaleString()}`} label="Potential Savings" color="text-green-600" />
        <Item value={`${summary.avgScore}%`} label="Avg Match Score" color="text-orange-500" />
      </div>
    </div>
  );
}

function Item({ value, label, color }) {
  return (
    <div>
      <p className={`text-lg font-semibold ${color}`}>{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

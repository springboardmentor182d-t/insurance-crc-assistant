export default function ExpertRecommendation({ note }) {
  if (!note) return null;   // ✅ important

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
      <h3 className="font-semibold mb-2">Expert Note</h3>
      <p className="text-sm text-gray-600 mb-3">{note}</p>
      <p className="text-xs text-blue-600 font-medium">
        Recommended by 95% of advisors
      </p>
    </div>
  );
}

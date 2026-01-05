export default function RecommendationFeatures({ features }) {
  // Normalize features into array
  const normalizedFeatures = Array.isArray(features)
    ? features
    : typeof features === "string"
    ? [features]
    : [];

  if (normalizedFeatures.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Key Features</h2>

      <div className="grid grid-cols-2 gap-3">
        {normalizedFeatures.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full shrink-0" />
            <span className="text-sm text-gray-700">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

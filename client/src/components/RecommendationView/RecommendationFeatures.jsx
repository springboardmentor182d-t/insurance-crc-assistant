import { Check } from "lucide-react";

export default function RecommendationFeatures({ features }) {
  // Normalize features safely
  const normalizedFeatures = Array.isArray(features)
    ? features
    : typeof features === "string"
    ? [features]
    : [];

  if (!normalizedFeatures.length) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">
        Key Features
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {normalizedFeatures.map((feature, index) => (
          <div
            key={`${feature}-${index}`}
            className="flex items-start gap-2"
          >
            <Check
              size={16}
              className="text-green-500 mt-0.5 shrink-0"
            />
            <span className="text-sm text-gray-700 leading-snug">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

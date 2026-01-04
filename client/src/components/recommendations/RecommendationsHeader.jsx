import { Award } from "lucide-react";

export default function RecommendationsHeader() {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-3">
        <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
          <Award />
        </div>
      </div>

      <h1 className="text-2xl font-semibold">Recommended For You</h1>
      <p className="text-sm text-gray-500 mt-1">
        Based on your preferences and profile, we found these perfect matches
      </p>
    </div>
  );
}

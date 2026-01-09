import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecommendationById } from "../services/recommendationsService";

import RecommendationHeader from "../components/RecommendationView/RecommendationHeader";
import RecommendationReason from "../components/RecommendationView/RecommendationReason";
import PremiumCoverageAnalysis from "../components/RecommendationView/PremiumCoverageAnalysis";
import RecommendationActions from "../components/RecommendationView/RecommendationActions";
import MarketComparison from "../components/RecommendationView/MarketComparison";
import ExpertRecommendation from "../components/RecommendationView/ExpertRecommendation";
import RecommendationFeatures from "../components/RecommendationView/RecommendationFeatures";

export default function RecommendationView() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getRecommendationById(id)
      .then(setData)
      .catch(() => setData(null));
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-3 gap-6">
      
      {/* LEFT */}
      <div className="col-span-2 space-y-6">
        <RecommendationHeader data={data} />

        {/* ✅ FIX 1 */}
        <RecommendationReason reasons={data.reasons} />

        <PremiumCoverageAnalysis data={data} />

        {/* ✅ FIX 2 */}
        {data.features && (
          <RecommendationFeatures features={data.features} />
        )}
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* ✅ FIX 3 */}
        <RecommendationActions data={data} />

        {data.market && (
          <MarketComparison market={data.market} />
        )}

        <ExpertRecommendation note={data.expert_note} />
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

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
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    getRecommendationById(id)
      .then(setData)
      .catch(() => setData(null));
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* ================= LEFT COLUMN ================= */}
        <div className="col-span-2 space-y-6">

          {/* 🔙 Back to Recommendations */}
          <button
            onClick={() => navigate("/recommendations")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Recommendations</span>
          </button>

          {/* Header */}
          <RecommendationHeader data={data} />

          {/* Reasons */}
          <RecommendationReason reasons={data.reasons} />

          {/* Premium vs Coverage */}
          <PremiumCoverageAnalysis data={data} />

          {/* Key Features */}
          <RecommendationFeatures features={data.features} />
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">
          <RecommendationActions />
          <MarketComparison market={data.market} />
          <ExpertRecommendation note={data.expert_note} />
        </div>

      </div>
    </div>
  );
}

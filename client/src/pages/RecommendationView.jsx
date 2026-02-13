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
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH RECOMMENDATION ---------------- */
  useEffect(() => {
    setLoading(true);

    getRecommendationById(id)
      .then((res) => setData(res))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading recommendation...
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p>Recommendation not found.</p>
        <button
          onClick={() => navigate("/recommendations")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Recommendations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* ================= LEFT COLUMN ================= */}
        <div className="col-span-2 space-y-6">

          {/* 🔙 Back */}
          <button
            onClick={() => navigate("/recommendations")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Recommendations</span>
          </button>

          {/* HEADER */}
          <RecommendationHeader data={data} />

          {/* WHY WE RECOMMEND */}
          <RecommendationReason reasons={data.reasons} />

          {/* PREMIUM vs COVERAGE */}
          <PremiumCoverageAnalysis data={data} />

          {/* KEY FEATURES */}
          <RecommendationFeatures
            features={data.policy?.benefits}
          />
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">

          {/* ACTIONS (COMPARE / BUY) */}
          <RecommendationActions policy={data} />

          {/* MARKET COMPARISON */}
          <MarketComparison market={data.market} />

          {/* EXPERT NOTE */}
          <ExpertRecommendation note={data.expert_note} />
        </div>

      </div>
    </div>
  );
}

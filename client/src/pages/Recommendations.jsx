import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../services/recommendationsService";

import { Award } from "lucide-react";
import PolicyCard from "../components/recommendations/PolicyCard";

export default function Recommendations() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);

  /* ---------------- FETCH FROM BACKEND ---------------- */
  useEffect(() => {
    getRecommendations()
      .then((data) => {
        if (!data?.items) {
          setPolicies([]);
          return;
        }

        setPolicies(
          data.items.map((item) => ({
            id: item.id,
            title: item.title,
            provider: item.provider,
            score: item.score,
            premium: item.premium,
            coverage: item.coverage,
            savings: item.savings ?? 0,

            // ✅ normalize keys for PolicyCard
            policy_type: item.type?.toLowerCase(),
            highlight: item.reason,

            best: item.score >= 90,
          }))
        );
      })
      .catch(() => setPolicies([]))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- SUMMARY ---------------- */
  const summary = {
    matched: policies.length,
    savings: policies.reduce((sum, p) => sum + p.savings, 0),
    avgScore:
      policies.length > 0
        ? Math.round(
            policies.reduce((sum, p) => sum + p.score, 0) / policies.length
          )
        : 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading recommendations...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
            <Award />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          Recommended For You
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Based on your preferences and profile
        </p>
      </div>

      {/* SUMMARY BAR */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="grid grid-cols-3 bg-blue-50 border rounded-xl py-6 text-center">
          <SummaryItem value={summary.matched} label="Policies Matched" />
          <SummaryItem
            value={`₹ ${summary.savings.toLocaleString()}`}
            label="Potential Savings"
          />
          <SummaryItem
            value={`${summary.avgScore}%`}
            label="Avg Match Score"
          />
        </div>
      </div>

      {/* POLICY LIST */}
      <div className="max-w-5xl mx-auto space-y-6">
        {policies.length === 0 ? (
          <p className="text-center text-gray-500">
            No recommendations available. Please update your preferences.
          </p>
        ) : (
          policies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))
        )}
      </div>

      {/* FOOTER CTA */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-500 mb-3">
          Not finding what you're looking for?
        </p>
        <button
          onClick={() => navigate("/preferences")}
          className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Update Preferences
        </button>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SummaryItem({ value, label }) {
  return (
    <div>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

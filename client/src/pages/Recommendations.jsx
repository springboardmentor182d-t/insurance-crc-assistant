import { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendationsService";

import {
  Award,
  Heart,
  ShieldCheck,
  Car,
} from "lucide-react";

export default function Recommendations() {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);

  /* ---------------- FETCH FROM BACKEND ---------------- */
  useEffect(() => {
    getRecommendations()
      .then((data) => {
        if (data?.items) {
          setPolicies(
            data.items.map((item) => ({
              id: item.id,
              title: item.title,
              provider: item.provider,
              score: item.score,
              premium: item.premium,
              coverage: item.coverage,
              savings: item.savings ?? 0,
              reason: item.reason,
              best: item.score >= 95,
              icon: getIcon(item.type), // ✅ FIXED
            }))
          );
        } else {
          setPolicies([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load recommendations", err);
        setPolicies([]); // ✅ SAFE FALLBACK
      })
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
        <button className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">
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

function PolicyCard({ policy }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm flex overflow-hidden">
      {/* LEFT SCORE */}
      <div className="w-28 flex flex-col items-center justify-center bg-gray-50">
        {policy.best && (
          <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full mb-3">
            Best Match
          </span>
        )}

        <div className="w-14 h-14 rounded-full border-4 border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
          {policy.score}%
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="flex gap-3 mb-1 items-center">
          <div className="bg-blue-50 p-2 rounded-lg">
            {policy.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {policy.title}
            </h3>
            <p className="text-sm text-gray-500">
              {policy.provider}
            </p>
          </div>
        </div>

        <p className="text-sm text-orange-600 mt-2">
          ↗ {policy.reason}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Info
            label="Annual Premium"
            value={`₹ ${policy.premium.toLocaleString()}`}
          />
          <Info
            label="Coverage"
            value={`₹ ${policy.coverage.toLocaleString()}`}
          />
          <Info
            label="Savings"
            value={`₹ ${policy.savings.toLocaleString()}`}
            highlight
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="w-52 p-6 flex flex-col gap-3 justify-center">
        <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View Details
        </button>
        <button className="border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50">
          Compare
        </button>
        <button className="text-sm text-gray-500 hover:underline">
          Save for Later
        </button>
      </div>
    </div>
  );
}

function Info({ label, value, highlight }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p
        className={`text-sm font-medium ${
          highlight ? "text-green-600" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function getIcon(type) {
  switch (type) {
    case "health":
      return <Heart className="text-blue-600" />;
    case "life":
      return <ShieldCheck className="text-blue-600" />;
    case "auto":
      return <Car className="text-blue-600" />;
    default:
      return <Award className="text-blue-600" />;
  }
}

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { CheckCircle, Star } from "lucide-react";

export default function TravelRecResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("score");

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!state) return;

    api
      .post("/api/recommendations/travel", state)
      .then((res) => setPolicies(res.data))
      .finally(() => setLoading(false));
  }, [state]);

  /* ================= SORT ================= */
  const sortedPolicies = useMemo(() => {
    const data = [...policies];

    if (sortBy === "premium") {
      return data.sort(
        (a, b) =>
          (a.annual_premium ?? Infinity) -
          (b.annual_premium ?? Infinity)
      );
    }

    return data.sort((a, b) => b.score - a.score);
  }, [policies, sortBy]);

  if (loading) {
    return <div className="px-16 py-12 text-gray-500">Loading…</div>;
  }

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Recommended Travel Policies
        </h1>

        <button
          onClick={() => navigate("/travel_insurance_rec")}
          className="px-8 py-2 rounded-full text-sm font-semibold
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                     text-white shadow-md hover:scale-[1.05]"
        >
          ← Back to Assessment
        </button>
      </div>

      {/* SORT BAR */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>

        <div className="flex bg-gray-100 rounded-full p-1 w-[420px]">
          <button
            onClick={() => setSortBy("score")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold
              ${sortBy === "score"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                : "text-gray-600"}`}
          >
            ⭐ Best Match
          </button>

          <button
            onClick={() => setSortBy("premium")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold
              ${sortBy === "premium"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                : "text-gray-600"}`}
          >
            💰 Lowest Premium
          </button>
        </div>
      </div>

      {/* POLICY CARDS */}
      <div className="space-y-8">
        {sortedPolicies.map((p, index) => (
          <div
            key={p.policy_id}
            className="relative rounded-3xl bg-white
                       border border-indigo-100 shadow-sm
                       p-6 flex justify-between gap-6"
          >
            {/* LEFT */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{p.policy_name}</h2>

                {index === 0 && sortBy === "score" && (
                  <span className="flex items-center gap-1
                                   px-3 py-1 rounded-full text-xs font-semibold
                                   bg-emerald-500 text-white">
                    <Star size={12} /> Best Match
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">{p.insurer_name}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  "Medical coverage",
                  "Trip cancellation",
                  "Baggage protection",
                  "Worldwide assistance",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm
                               bg-indigo-50 px-3 py-2 rounded-xl"
                  >
                    <CheckCircle size={16} className="text-indigo-500" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col justify-between items-end">
              <div>
                <p className="text-2xl font-extrabold text-indigo-600">
                  ₹{Math.round(p.annual_premium).toLocaleString("en-IN")} / year
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Match Score{" "}
                  <span className="font-semibold text-gray-800">
                    {p.score}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/policies/travel/${p.policy_id}`)}
                className="mt-6 px-7 py-2 rounded-full text-sm font-semibold
                           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                           text-white shadow-md hover:scale-[1.05]"
              >
                View Policy
              </button>
            </div>

            <div className="absolute top-0 right-0 h-full w-2
                            bg-gradient-to-b from-indigo-500 to-pink-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { CheckCircle, Star, ArrowLeft } from "lucide-react";

export default function HealthRecResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("score");

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!state) {
      setLoading(false);
      return;
    }

    api
      .post("/api/recommendations/health", state)
      .then((res) => setPolicies(res.data || []))
      .finally(() => setLoading(false));
  }, [state]);

  /* ================= SORT ================= */
  const sortedPolicies = useMemo(() => {
    if (!policies.length) return [];
    return [...policies].sort((a, b) =>
      sortBy === "premium"
        ? a.monthly_premium - b.monthly_premium
        : b.score - a.score
    );
  }, [policies, sortBy]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-10 bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-2xl font-bold">
          Recommended{" "}
          <span className="text-[var(--accent)]">
            Health Policies
          </span>
        </h1>

        <button
          onClick={() => navigate("/health_insurance_rec")}
          className="inline-flex items-center gap-2 px-8 py-2 rounded-full text-sm font-semibold
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white shadow-md hover:shadow-lg hover:scale-[1.05] transition"
        >
          <ArrowLeft size={16} /> Back to Assessment
        </button>
      </div>

      {/* SORT BAR */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[var(--text-muted)]">
          Sort by:
        </span>

        <div className="flex bg-[var(--bg-card)] border border-[var(--border)] rounded-full p-1 w-[420px]">
          <button
            onClick={() => setSortBy("score")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all
              ${
                sortBy === "score"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                  : "text-[var(--text-muted)] hover:text-[var(--accent)]"
              }`}
          >
            ⭐ Best Match
          </button>

          <button
            onClick={() => setSortBy("premium")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all
              ${
                sortBy === "premium"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                  : "text-[var(--text-muted)] hover:text-[var(--accent)]"
              }`}
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
            className="relative rounded-3xl p-6 bg-[var(--bg-card)]
              border border-[var(--border)] hover:shadow-xl transition
              flex flex-col lg:flex-row gap-6 justify-between"
          >
            {/* LEFT */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">
                  {p.policy_name}
                </h2>

                {index === 0 && sortBy === "score" && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full
                    text-xs font-semibold bg-emerald-500 text-white shadow">
                    <Star size={12} /> Best Match
                  </span>
                )}
              </div>

              <p className="text-sm text-[var(--text-muted)]">
                {p.insurer_name}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  "Budget-friendly",
                  "Low co-pay",
                  "Good room rent",
                  "Wide hospital network",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm
                      bg-[var(--bg-main)] px-3 py-2 rounded-xl
                      border border-[var(--border)]"
                  >
                    <CheckCircle size={16} className="text-[var(--accent)]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-[var(--accent)]">
                  ₹ {Number(p.monthly_premium).toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Match Score{" "}
                  <span className="font-semibold text-[var(--text-main)]">
                    {p.score}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/policies/health/${p.policy_id}`)}
                className="mt-6 px-7 py-2 rounded-full text-sm font-semibold
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  text-white shadow-md hover:shadow-lg hover:scale-[1.05] transition"
              >
                View Policy
              </button>
            </div>

            {/* ACCENT STRIP */}
            <div className="absolute top-0 right-0 h-full w-1.5
              bg-gradient-to-b from-indigo-500 to-purple-500
              rounded-tr-3xl rounded-br-3xl" />
          </div>
        ))}

        {!sortedPolicies.length && (
          <div className="text-center text-[var(--text-muted)] py-20">
            No matching health policies found.
          </div>
        )}
      </div>
    </div>
  );
}

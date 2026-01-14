import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HealthRecResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");

  /* ================= FETCH RECOMMENDATIONS ================= */
  useEffect(() => {
    const data = location.state;

    // 🚨 User opened page directly
    if (!data) {
      navigate("/health_insurance_rec");
      return;
    }

    axios
      .post("/api/health/recommendations", data)
      .then((res) => {
        setPolicies(res.data || []);
      })
      .catch(() => {
        navigate("/health_insurance_rec");
      })
      .finally(() => setLoading(false));
  }, [location.state, navigate]);

  /* ================= SORTING ================= */
  const sortedPolicies = useMemo(() => {
    if (!policies.length) return [];

    const list = [...policies];

    if (sortType === "premium") {
      return list.sort((a, b) => a.premium - b.premium);
    }

    if (sortType === "comprehensive") {
      return list.sort((a, b) => b.premium - a.premium);
    }

    // best match
    return list.sort((a, b) => b.score - a.score);
  }, [policies, sortType]);

  /* ================= STATES ================= */
  if (loading) {
    return <p className="text-center mt-20">Loading recommendations...</p>;
  }

  if (!sortedPolicies.length) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          No matching health plans found
        </h1>
        <p className="text-gray-500 mb-6">
          Try adjusting your preferences for better matches.
        </p>
        <button
          onClick={() => navigate("/health_insurance_rec")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Update Preferences
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Your{" "}
          <span className="text-indigo-600">
            Personalized Health Plans
          </span>
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          These plans are curated based on your health needs, budget, and
          preferences.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["best", "premium", "comprehensive"].map((t) => (
          <button
            key={t}
            onClick={() => setSortType(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              sortType === t
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {t === "best"
              ? "Best Match"
              : t === "premium"
              ? "Lowest Premium"
              : "Comprehensive"}
          </button>
        ))}
      </div>

      {/* POLICY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((p, index) => (
          <div
            key={p.id}
            className="relative border rounded-2xl p-6 bg-white shadow hover:shadow-xl transition flex flex-col"
          >
            {index === 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                Top Pick
              </span>
            )}

            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-indigo-600" />
            </div>

            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-3">
              Health Insurance Plan
            </p>

            {/* DETAILS */}
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              <li>
                <strong>Coverage:</strong> {p.coverage}
              </li>
              <li>
                <strong>Match Score:</strong> {p.score}
              </li>

              {/* EXPLANATIONS */}
              {p.explanation?.slice(0, 3).map((e, idx) => (
                <li
                  key={idx}
                  className="text-xs text-gray-500"
                >
                  • {e}
                </li>
              ))}
            </ul>

            {/* FOOTER */}
            <div className="mt-auto flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Annual Premium</p>
                <p className="text-2xl font-bold">
                  ₹{p.premium.toLocaleString()}
                </p>
              </div>

              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BACK CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/health_insurance_rec")}
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Modify health preferences
        </button>
      </div>
    </div>
  );
}

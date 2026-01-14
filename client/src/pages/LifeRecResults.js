import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LifeRecResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");

  /* ================= LOAD RECOMMENDATIONS ================= */
  useEffect(() => {
    if (!location.state) {
      navigate("/life_insurance_rec");
      return;
    }

    axios
      .post("/api/life/recommendations/", location.state)
      .then((res) => {
        setPolicies(res.data || []);
      })
      .catch(() => {
        navigate("/life_insurance_rec");
      })
      .finally(() => setLoading(false));
  }, [navigate, location.state]);

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

    return list.sort((a, b) => b.score - a.score);
  }, [policies, sortType]);

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading recommendations...
      </p>
    );
  }

  if (!sortedPolicies.length) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          No matching life plans found
        </h1>
        <button
          onClick={() => navigate("/life_insurance_rec")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Update Preferences
        </button>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Your{" "}
          <span className="text-indigo-600">Life Insurance Matches</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Curated based on your life goals, dependents, and risk profile
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
              : "High Premium"}
          </button>
        ))}
      </div>

      {/* CARDS */}
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

            <ul className="text-sm text-gray-600 mt-3 mb-6 space-y-1">
              <li>Coverage: {p.coverage}</li>
              <li>Risk Level: {p.risk_level}</li>
              <li>Match Score: {p.score}</li>

              {p.explanation?.slice(0, 3).map((e, idx) => (
                <li key={idx} className="text-xs text-gray-500">
                  • {e}
                </li>
              ))}
            </ul>

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

      {/* BACK */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/life_insurance_rec")}
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Modify life preferences
        </button>
      </div>
      
    </div>
  );
}

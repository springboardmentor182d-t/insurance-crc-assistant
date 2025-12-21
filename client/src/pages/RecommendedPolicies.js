import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";

export default function RecommendedPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");

  // FETCH DATA
  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/recommendations")
      .then((res) => {
        const normalized = res.data.map((p) => ({
          ...p,
          premium: Number(p.premium),
          score: Number(p.score),
        }));

        setPolicies(normalized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ SORTING LOGIC (FINAL)
  const sortedPolicies = useMemo(() => {
    if (!policies.length) return [];

    const sorted = [...policies];

    // BEST MATCH → highest score
    if (sortType === "best") {
      return sorted.sort((a, b) => b.score - a.score);
    }

    // LOWEST PREMIUM → low to high
    if (sortType === "premium") {
      return sorted.sort((a, b) => a.premium - b.premium);
    }

    // ✅ COMPREHENSIVE → HIGH PREMIUM TO LOW PREMIUM
    if (sortType === "comprehensive") {
      return sorted.sort((a, b) => b.premium - a.premium);
    }

    return sorted;
  }, [policies, sortType]);

  if (loading) {
    return <p className="text-center mt-20">Loading recommendations...</p>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Top Picks for Your{" "}
          <span className="text-indigo-600">Profile</span>
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Personalized insurance plans based on your preferences.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSortType("best")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            sortType === "best"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Best Match
        </button>

        <button
          onClick={() => setSortType("premium")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            sortType === "premium"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Lowest Premium
        </button>

        <button
          onClick={() => setSortType("comprehensive")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            sortType === "comprehensive"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Comprehensive
        </button>
      </div>

      {/* POLICY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((policy, index) => (
          <div
            key={policy.id}
            className="relative border rounded-2xl p-6 shadow-sm hover:shadow-xl transition bg-white"
          >
            {index === 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                Top Pick
              </span>
            )}

            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <ShieldCheck className="text-indigo-600" />
            </div>

            <h3 className="text-lg font-semibold">{policy.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {policy.category} Insurance
            </p>

            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>✔ Match Score: {policy.score}</li>
            </ul>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Annual Premium</p>
                <p className="text-2xl font-bold">
                  ₹{policy.premium.toLocaleString()}
                </p>
              </div>
              <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

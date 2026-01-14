import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HomeRecResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best"); // best | premium | comprehensive

  const preferences = location.state;

  /* ================= LOAD RECOMMENDATIONS ================= */
  useEffect(() => {
    if (!preferences) {
      navigate("/home_insurance_rec");
      return;
    }

    axios
      .post("/api/property/recommendations/", preferences)
      .then((res) => setPolicies(res.data || []))
      .catch(() => navigate("/home_insurance_rec"))
      .finally(() => setLoading(false));
  }, [preferences, navigate]);

  /* ================= SORTING (LIKE HEALTH / LIFE) ================= */
  const sortedPolicies = useMemo(() => {
    const list = [...policies];

    if (sortType === "premium") {
      // LOW → HIGH
      return list.sort((a, b) => a.premium - b.premium);
    }

    if (sortType === "comprehensive") {
      // HIGH → LOW
      return list.sort((a, b) => b.premium - a.premium);
    }

    // BEST MATCH (default)
    return list.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [policies, sortType]);

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading home insurance plans...
      </p>
    );
  }

  if (!sortedPolicies.length) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          No matching home insurance plans found
        </h1>
        <button
          onClick={() => navigate("/home_insurance_rec")}
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

      {/* ===== BACK TO QUESTIONNAIRE (LIKE HEALTH/LIFE) ===== */}
      

      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Home Insurance{" "}
          <span className="text-indigo-600">Recommendations</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Plans matched to your property and budget
        </p>
      </div>

      {/* ===== SORT BUTTONS (MATCH HEALTH/LIFE EXACTLY) ===== */}
      <div className="flex gap-3 mb-8">
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

      {/* ===== POLICY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((p, index) => (
          <div
            key={p.id}
            className="relative border rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg transition"
          >
            {index === 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                Top Pick
              </span>
            )}

            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <ShieldCheck className="text-indigo-600" />
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {p.name}
            </h3>

            <ul className="text-sm text-gray-600 space-y-1 mb-6">
              <li>✔ Coverage: {p.coverage}</li>
              <li>✔ Property: {p.property_type}</li>
              <li>✔ Sum Insured: ₹{p.sum_insured}</li>
            </ul>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">
                  Annual Premium
                </p>
                <p className="text-2xl font-bold">
                  ₹{p.premium}
                </p>
              </div>

              <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/home_insurance_rec")}
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Modify home preferences
        </button>
      </div>
    </div>
  );
}

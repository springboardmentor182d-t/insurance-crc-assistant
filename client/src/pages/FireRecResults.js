import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FireRecResults() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");

  useEffect(() => {
    if (!state) {
      navigate("/fire_property_insurance_rec");
      return;
    }

    axios
      .post("/api/fire/recommendations", state)
      .then(res => setPolicies(res.data || []))
      .finally(() => setLoading(false));
  }, [state, navigate]);

  const sortedPolicies = useMemo(() => {
    const list = [...policies];

    if (sortType === "premium") {
      return list.sort((a, b) => a.premium - b.premium);
    }

    if (sortType === "comprehensive") {
      return list.sort((a, b) => b.premium - a.premium);
    }

    return list.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [policies, sortType]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading plans...</p>;
  }

  if (!sortedPolicies.length) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold">No matching fire policies found</h2>
        <button
          onClick={() => navigate("/fire_property_insurance_rec")}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Modify Preferences
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* ===== HEADER (LIKE HEALTH / LIFE) ===== */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Fire & Property Insurance{" "}
          <span className="text-indigo-600">Recommendations</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Policies matched to your property details and coverage needs
        </p>
      </div>

      {/* ===== SORT BUTTONS (MATCH HEALTH UI) ===== */}
      <div className="flex gap-3 mb-8">
        {[
          { key: "best", label: "Best Match" },
          { key: "premium", label: "Lowest Premium" },
          { key: "comprehensive", label: "Comprehensive" }
        ].map(b => (
          <button
            key={b.key}
            onClick={() => setSortType(b.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              sortType === b.key
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* ===== POLICY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((p, i) => (
          <div
            key={p.id}
            className="relative border rounded-2xl p-6 bg-white shadow-sm"
          >
            {i === 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                Top Pick
              </span>
            )}

            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-indigo-600" />
            </div>

            <h3 className="font-semibold text-lg mb-2">{p.name}</h3>

            <p className="text-sm text-gray-600 mb-4">
              Coverage: {p.coverage.join(", ")}
            </p>

            <p className="text-2xl font-bold">₹{p.premium}</p>
            <p className="text-sm text-gray-500 mt-1">
              Sum Insured: ₹{p.sum_insured}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/fire_property_insurance_rec")}
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Modify preferences
        </button>
      </div>
    </div>
  );
}

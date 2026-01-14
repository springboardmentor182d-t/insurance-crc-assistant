import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MotorRecResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");

  /* ================= LOAD RECOMMENDATIONS ================= */
  useEffect(() => {
    if (!location.state) {
      navigate("/motor_insurance_rec");
      return;
    }

    axios
      .post("/api/motor/recommendations/", location.state)
      .then((res) => setPolicies(res.data || []))
      .catch(() => navigate("/motor_insurance_rec"))
      .finally(() => setLoading(false));
  }, [navigate, location.state]);

  /* ================= SORTING ================= */
  const sortedPolicies = useMemo(() => {
    const list = [...policies];

    if (sortType === "premium") {
      return list.sort((a, b) => a.premium - b.premium);
    }

    if (sortType === "high") {
      return list.sort((a, b) => b.premium - a.premium);
    }

    return list.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [policies, sortType]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading motor insurance plans...
      </p>
    );
  }

  if (!sortedPolicies.length) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">
          No matching motor plans found
        </h2>
        <button
          onClick={() => navigate("/motor_insurance_rec")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Modify Preferences
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="px-10 py-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Your <span className="text-indigo-600">Motor Insurance</span> Matches
        </h1>
        <p className="text-gray-500 mt-1">
          Curated based on your vehicle, usage, and budget
        </p>
      </div>

      {/* SORT PILLS */}
      <div className="flex gap-3 mb-10">
        {[
          { id: "best", label: "Best Match" },
          { id: "premium", label: "Lowest Premium" },
          { id: "high", label: "High Premium" },
        ].map((b) => (
          <button
            key={b.id}
            onClick={() => setSortType(b.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              sortType === b.id
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((p, index) => (
          <div
            key={p.id}
            className="relative bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col"
          >
            {index === 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                Top Pick
              </span>
            )}

            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-indigo-600" />
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {p.policy_name}
            </h3>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>Coverage: {p.coverage}</p>
              <p>Plan Type: {p.plan_type}</p>
              <p>Vehicle Type: {p.vehicle_type}</p>
              {p.score !== undefined && (
                <p>Match Score: {p.score}</p>
              )}
            </div>

            <div className="mt-auto flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Annual Premium</p>
                <p className="text-2xl font-bold">₹{p.premium}</p>
              </div>

              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODIFY LINK */}
      <div className="mt-14 text-center">
        <button
          onClick={() => navigate("/motor_insurance_rec")}
          className="text-indigo-600 text-sm hover:underline"
        >
          ← Modify motor preferences
        </button>
      </div>
    </div>
  );
}

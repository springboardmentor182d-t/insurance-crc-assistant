import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";

import PolicyInfoBox from "./PolicyInfoBox";
import ScoreRing from "./ScoreRing";
import { getPolicyIcon } from "./icons";

/* ---------- STYLE HELPERS ---------- */
function getStyle(type) {
  switch (type) {
    case "health":
      return { bg: "bg-red-50", ring: "#ef4444" };
    case "life":
      return { bg: "bg-blue-50", ring: "#3b82f6" };
    case "auto":
      return { bg: "bg-orange-50", ring: "#f97316" };
    case "travel":
      return { bg: "bg-purple-50", ring: "#a855f7" };
    case "home":
      return { bg: "bg-green-50", ring: "#22c55e" };
    default:
      return { bg: "bg-gray-50", ring: "#6b7280" };
  }
}

export default function PolicyCard({ policy }) {
  const navigate = useNavigate();
  const { selected, toggleCompare } = useCompare();

  const type = policy.policy_type?.toLowerCase();
  const { bg, ring } = getStyle(type);

  const isSelected = selected.some((p) => p.id === policy.id);

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden flex">

      {/* SCORE SECTION */}
      <div className={`w-32 flex flex-col items-center justify-center ${bg}`}>
        {policy.score >= 90 && (
          <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full mb-3">
            Best Match
          </span>
        )}

        <ScoreRing score={policy.score ?? 0} color={ring} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-gray-100 p-2 rounded-lg">
            {getPolicyIcon(type)}
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {policy.title}
            </h3>
            <p className="text-sm text-gray-500">
              {policy.provider}
            </p>
          </div>
        </div>

        <p className="text-sm text-orange-600 mt-2">
          ↗ {policy.highlight || "Good match based on your preferences"}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <PolicyInfoBox
            label="Annual Premium"
            value={`₹ ${policy.premium.toLocaleString()}`}
          />
          <PolicyInfoBox
            label="Coverage"
            value={`₹ ${policy.coverage.toLocaleString()}`}
          />
          <PolicyInfoBox
            label="Potential Savings"
            value={`₹ ${policy.savings.toLocaleString()}`}
            highlight
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="w-52 p-6 flex flex-col gap-3 justify-center">
        <button
          onClick={() =>
            navigate(`/recommendations/view/${policy.id}`)
          }
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </button>

        <button
          onClick={() => toggleCompare(policy)}
          className={`py-2 rounded-lg border transition
            ${
              isSelected
                ? "bg-red-50 border-red-400 text-red-600 hover:bg-red-100"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
            }
          `}
        >
          {isSelected ? "Remove" : "Compare"}
        </button>

        <button
          onClick={() => alert("Save for later coming soon 🚧")}
          className="text-sm text-gray-500 hover:underline"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}

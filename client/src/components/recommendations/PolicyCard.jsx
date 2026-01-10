import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";

import PolicyInfoBox from "./PolicyInfoBox";
import ScoreRing from "./ScoreRing";
import { getPolicyIcon } from "./icons";

/* ---------- STYLE HELPERS ---------- */
function getStyle(type) {
  switch (type) {
    case "health":
      return {
        panelBg: "bg-red-100",
        ring: "#ef4444",
        logoBg: "bg-red-100 text-red-600",
      };
    case "life":
      return {
        panelBg: "bg-blue-100",
        ring: "#2563eb",
        logoBg: "bg-blue-100 text-blue-600",
      };
    case "auto":
      return {
        panelBg: "bg-orange-100",
        ring: "#f59e0b",
        logoBg: "bg-orange-100 text-orange-600",
      };
    case "travel":
      return {
        panelBg: "bg-purple-100",
        ring: "#a855f7",
        logoBg: "bg-purple-100 text-purple-600",
      };
    case "home":
      return {
        panelBg: "bg-green-100",
        ring: "#22c55e",
        logoBg: "bg-green-100 text-green-600",
      };
    default:
      return {
        panelBg: "bg-gray-100",
        ring: "#6b7280",
        logoBg: "bg-gray-100 text-gray-600",
      };
  }
}

export default function PolicyCard({ policy }) {
  const navigate = useNavigate();
  const { selected, addToCompare, removeFromCompare } = useCompare();

  if (!policy) return null;

  const {
    id,
    name,
    title,
    provider,
    category,
    premium,
    coverage,
    score = 0,
    savings = 0,
    reason,
    best,
  } = policy;

  const displayName = name || title || "Unnamed Policy";
  const type = category?.toLowerCase();
  const { panelBg, ring, logoBg } = getStyle(type);

  const isSelected = selected.some((p) => p.id === id);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex">
      {/* ================= LEFT SCORE PANEL ================= */}
      <div className={`w-32 flex flex-col items-center justify-center ${panelBg}`}>
        {best && (
          <span className="text-[11px] bg-orange-500 text-white px-3 py-1 rounded-full mb-2">
            Best Match
          </span>
        )}
        <ScoreRing score={score} color={ring} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${logoBg}`}>
            {getPolicyIcon(type)}
          </div>

          <div>
            <h3 className="font-semibold text-base text-slate-900">
              {displayName}
            </h3>
            <p className="text-xs text-slate-500">
              {provider}
            </p>
          </div>
        </div>

        <p className="text-xs text-orange-600 font-medium mt-2">
          ↗ {reason || "Good match based on your preferences"}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-5">
          <PolicyInfoBox
            label="Annual Premium"
            value={`₹ ${Number(premium || 0).toLocaleString("en-IN")}`}
          />
          <PolicyInfoBox
            label="Coverage"
            value={`₹ ${Number(coverage || 0).toLocaleString("en-IN")}`}
          />
          <PolicyInfoBox
            label="Potential Savings"
            value={`₹ ${Number(savings || 0).toLocaleString("en-IN")}`}
            highlight
          />
        </div>
      </div>

      {/* ================= RIGHT ACTION PANEL (FINAL FIX) ================= */}
      <div
        className="
          w-48 px-5 py-6
          flex flex-col gap-3 justify-center
          bg-blue-50 border-l border-blue-100
          rounded-r-2xl
        "
      >
        <button
          onClick={() => navigate(`/recommendations/view/${id}`)}
          className="bg-blue-600 hover:bg-blue-700 shadow-sm text-white py-2.5 rounded-lg text-sm transition"
        >
          View Details
        </button>

        <button
          onClick={() =>
            isSelected ? removeFromCompare(id) : addToCompare(policy)
          }
          className={`py-2.5 rounded-lg border text-sm transition ${
            isSelected
              ? "bg-red-50 border-red-400 text-red-600 hover:bg-red-100"
              : "bg-white border-blue-500 text-blue-600 hover:bg-blue-50"
          }`}
        >
          {isSelected ? "Remove" : "Compare"}
        </button>

        <button className="text-xs text-slate-500 hover:underline text-center">
          Save for Later
        </button>
      </div>
    </div>
  );
}

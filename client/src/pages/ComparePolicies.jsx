import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { comparisonRules } from "../config/comparisonRules";
import { getBestIndex } from "../utils/getBestIndex";
import {
  Heart,
  Shield,
  Car,
  Plane,
  Home,
  Check,
  X,
  HelpCircle,
} from "lucide-react";

/* ===============================
   CATEGORY CONFIG (SAFE)
================================ */
const categoryConfig = {
  Health: {
    icon: Heart,
    cardBg: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
  },
  Life: {
    icon: Shield,
    cardBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  Auto: {
    icon: Car,
    cardBg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  Travel: {
    icon: Plane,
    cardBg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  Home: {
    icon: Home,
    cardBg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
};

/* ===============================
   BOOLEAN ICON
================================ */
const boolIcon = (v) =>
  v === true ? (
    <Check className="mx-auto text-green-600" size={18} />
  ) : v === false ? (
    <X className="mx-auto text-red-500" size={18} />
  ) : (
    <span className="text-slate-400">N/A</span>
  );

/* ===============================
   ADD POLICY PLACEHOLDER
================================ */
function AddPolicyPlaceholder({ onBrowse }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-center p-6">
      <p className="text-sm text-slate-500 mb-3">
        Add policy to compare
      </p>
      <button
        onClick={onBrowse}
        className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
      >
        Browse Policies
      </button>
    </div>
  );
}

/* ===============================
   MAIN PAGE
================================ */
export default function ComparePolicies() {
  const navigate = useNavigate();
  const { selected, clearCompare } = useCompare();

  if (selected.length < 2) {
    return (
      <div className="p-10 text-center">
        <p className="text-slate-500">
          Select at least 2 policies to compare.
        </p>
        <button
          onClick={() => navigate("/policies")}
          className="mt-4 text-blue-600"
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 py-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Compare Policies</h1>
          <p className="text-sm text-slate-500">
            Side-by-side comparison of selected policies
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/policies")}
            className="px-4 py-2 text-sm border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Add More
          </button>
          <button
            onClick={clearCompare}
            className="text-sm text-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      {/* POLICY CARDS (CRASH-SAFE) */}
      <div className="grid grid-cols-[180px_repeat(3,1fr)] gap-6 mb-6">
        <div />

        {selected.map((p) => {
          const cfg =
            categoryConfig[p.category] ?? {
              icon: HelpCircle,
              cardBg: "bg-slate-50",
              iconBg: "bg-slate-200",
              iconColor: "text-slate-500",
            };

          const Icon = cfg.icon;

          return (
            <div
              key={p.id}
              className={`rounded-xl border shadow-sm overflow-hidden ${cfg.cardBg}`}
            >
              <div className="p-6 flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${cfg.iconBg}`}
                >
                  <Icon className={cfg.iconColor} size={24} />
                </div>

                <h3 className="font-semibold text-center text-slate-800">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {p.provider}
                </p>
              </div>

              <div className="px-6 pb-4">
                <button className="w-full py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}

        {selected.length === 2 && (
          <AddPolicyPlaceholder onBrowse={() => navigate("/policies")} />
        )}
      </div>

      {/* COMPARISON TABLE */}
      <div className="rounded-xl border bg-white overflow-hidden">
        {comparisonRules.map((rule) => {
          const values = selected.map((p) => p[rule.key]);
          const bestIndex = getBestIndex(rule, values);

          return (
            <div
              key={rule.key}
              className="grid grid-cols-[180px_repeat(3,1fr)] border-b last:border-none odd:bg-slate-50"
            >
              <div className="px-4 py-3 text-sm font-medium text-slate-700">
                {rule.label}
              </div>

              {values.map((v, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 text-center text-sm ${
                    bestIndex === i
                      ? "bg-yellow-100 font-semibold text-orange-600"
                      : ""
                  }`}
                >
                  {rule.type === "boolean"
                    ? boolIcon(v)
                    : rule.format
                    ? rule.format(v)
                    : v ?? "N/A"}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <p className="mt-3 text-xs text-center text-slate-400">
        <span className="inline-block w-3 h-3 bg-yellow-100 mr-2 rounded-sm"></span>
        Highlighted values indicate best option
      </p>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import {
  Heart,
  Shield,
  Car,
  Plane,
  Home,
  HelpCircle,
} from "lucide-react";

/* ===============================
   CATEGORY CONFIG
================================ */
const categoryConfig = {
  Health: {
    icon: Heart,
    headerBg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  Life: {
    icon: Shield,
    headerBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  Auto: {
    icon: Car,
    headerBg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  Travel: {
    icon: Plane,
    headerBg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  Home: {
    icon: Home,
    headerBg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
};

const fallbackConfig = {
  icon: HelpCircle,
  headerBg: "bg-slate-50",
  iconBg: "bg-slate-100",
  iconColor: "text-slate-500",
};

/* ===============================
   HELPERS
================================ */
const formatCurrency = (value) =>
  value == null ? "N/A" : Number(value).toLocaleString("en-IN");

export default function PolicyCard({ policy }) {
  const navigate = useNavigate();
  const { selected, toggleCompare } = useCompare();

  const isSelected = selected.some((p) => p.id === policy.id);
  const compareDisabled = !isSelected && selected.length >= 3;

  /* NORMALIZE CATEGORY */
  const normalizedCategory =
    policy.category?.trim().toLowerCase();

  const config =
    categoryConfig[
      normalizedCategory?.charAt(0).toUpperCase() +
        normalizedCategory?.slice(1)
    ] ?? fallbackConfig;

  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden self-start">

      {/* HEADER */}
      <div className={`p-5 ${config.headerBg}`}>
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.iconBg}`}
          >
            <Icon className={config.iconColor} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {policy.name}
            </h3>
            <p className="text-sm text-slate-500">
              {policy.provider}
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
          <div>
            <p className="text-slate-500">Annual Premium</p>
            <p className="font-medium">
              ₹ {formatCurrency(policy.premium)}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Coverage</p>
            <p className="font-medium text-green-600">
              ₹ {formatCurrency(policy.coverage)}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/policies/${policy.id}`)}
            className="flex-1 border border-blue-600 text-blue-600 rounded-lg py-2 text-sm hover:bg-blue-50 transition"
          >
            View Details
          </button>

          <button
            disabled={compareDisabled}
            onClick={() => toggleCompare(policy)}
            className={`flex-1 rounded-lg py-2 text-sm transition
              ${
                isSelected
                  ? "bg-red-100 text-red-600 border border-red-300"
                  : compareDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {isSelected ? "Remove" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  Car,
  Heart,
  Home,
  Shield,
  Plane,
  Briefcase,
  Flame,
  Plus,
} from "lucide-react";

/* ---------------- ICON MAP ---------------- */

const ICONS = {
  all: Shield,
  motor: Car,
  health: Heart,
  home: Home,
  life: Shield,
  travel: Plane,
  business: Briefcase,
  fire: Flame,
};

/* ---------------- FILTER TABS ---------------- */

const TABS = [
  { label: "All Policies", value: "all" },
  { label: "Auto", value: "motor" },
  { label: "Health", value: "health" },
  { label: "Home", value: "home" },
  { label: "Life", value: "life" },
  { label: "Travel", value: "travel" },
  { label: "Business", value: "business" },
  { label: "Fire", value: "fire" },
];

export default function AdminPolicyCatalog() {
  const [policies, setPolicies] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolicies("all");
  }, []);

  const fetchPolicies = (type) => {
    api.get("/admin/policies").then((res) => {
      if (type === "all") {
        setPolicies(res.data);
      } else {
        setPolicies(res.data.filter((p) => p.type === type));
      }
    });
  };

  return (
    <div className="px-10 py-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Policy Catalog (Admin)
          </h1>
          <p className="text-sm text-gray-500">
            Create, edit and manage insurance policies.
          </p>
        </div>

        {/* ✅ CREATE POLICY BUTTON */}
        <button
          onClick={() => navigate("/admin/policies/create")}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow hover:bg-indigo-700"
        >
          <Plus size={16} />
          Create Policy
        </button>
      </div>

      {/* ================= FILTER PILLS ================= */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const Icon = ICONS[tab.value];
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                fetchPolicies(tab.value);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  active
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-indigo-100 text-indigo-700"
                }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= POLICY GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <AdminPolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================= */
/* ==================== ADMIN POLICY CARD ====================== */
/* ============================================================= */

function AdminPolicyCard({ policy }) {
  const navigate = useNavigate();
  const Icon = ICONS[policy.type] || Shield;

  return (
    <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition">
      <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
        <Icon size={20} />
      </div>

      <h3 className="font-semibold text-gray-900">
        {policy.policy_name}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {policy.insurer}
      </p>

      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-sm font-semibold text-gray-900">
          ₹{Math.round(policy.monthly_premium)} /mo
        </p>

        <button
          onClick={() => navigate(`/admin/policies/${policy.id}`)}
          className="px-4 py-2 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
        >
          Manage
        </button>
      </div>
    </div>
  );
}

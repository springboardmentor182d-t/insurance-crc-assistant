import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  ArrowLeft,
  Briefcase,
  IndianRupee,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useCompare } from "../context/CompareContext";

export default function BusinessPolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPolicy } = useCompare();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/policies/business/${id}`)
      .then((res) => setPolicy(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="p-12 text-[var(--text-muted)]">Loading…</div>;

  if (!policy)
    return (
      <div className="p-12 text-red-500">
        Business policy not found
      </div>
    );

  return (
    <div className="min-h-screen px-6 sm:px-8 py-8 bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* HEADER CARD */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Briefcase className="text-indigo-600" />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              {policy.policy_name}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {policy.insurer}
            </p>

            <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {policy.status}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-[var(--text-muted)]">
            Base Premium
          </p>
          <p className="text-2xl font-semibold mt-1">
            ₹ {policy.base_premium}
          </p>

          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => {
                const result = addPolicy("business", policy);
                if (!result.success) {
                  alert(result.message);
                  return;
                }
                navigate("/compare");
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] hover:bg-[var(--bg-main)]"
            >
              Compare
            </button>

            <button
              onClick={() =>
                navigate("/quote-summary", {
                  state: {
                    policy: {
                      ...policy,
                      policy_type: "business",
                    },
                    from: "/catalog",
                  },
                })
              }
              className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <InfoCard
          icon={<Building2 />}
          title="Business Type"
          value={policy.business_type}
        />
        <InfoCard
          icon={<Briefcase />}
          title="Business Size"
          value={policy.business_size}
        />
        <InfoCard
          icon={<IndianRupee />}
          title="Annual Revenue Range"
          value={`₹ ${policy.min_annual_revenue} – ₹ ${policy.max_annual_revenue}`}
        />
      </div>

      {/* DETAILS */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8 mt-8 space-y-10">
        <Section title="Business Details">
          <Detail label="Ownership Type" value={policy.ownership_type} />
          <Detail label="Risk Intensity" value={policy.risk_intensity} />
          <Detail
            label="Asset Value Range"
            value={`₹ ${policy.min_asset_value} – ₹ ${policy.max_asset_value}`}
          />
        </Section>

        <Section title="Coverage">
          <Coverage label="Property Damage" value={policy.covers_property_damage} />
          <Coverage label="Fire" value={policy.covers_fire} />
          <Coverage label="Machinery Breakdown" value={policy.covers_machinery_breakdown} />
          <Coverage label="Theft" value={policy.covers_theft} />
          <Coverage label="Liability" value={policy.covers_liability} />
          <Coverage label="Employee Safety" value={policy.covers_employee_safety} />
          <Coverage label="Cyber Risk" value={policy.covers_cyber} />
          <Coverage label="Business Interruption" value={policy.covers_business_interruption} />
        </Section>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6">
      <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <p className="text-sm text-[var(--text-muted)] mt-4">
        {title}
      </p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function Coverage({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      {value ? (
        <CheckCircle size={16} className="text-emerald-500" />
      ) : (
        <XCircle size={16} className="text-gray-400" />
      )}
      <span
        className={
          value
            ? "text-[var(--text-main)]"
            : "text-[var(--text-muted)]"
        }
      >
        {label}
      </span>
    </div>
  );
}

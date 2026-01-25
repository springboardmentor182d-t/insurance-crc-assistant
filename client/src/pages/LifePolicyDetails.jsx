import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  ArrowLeft,
  ShieldCheck,
  IndianRupee,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useCompare } from "../context/CompareContext";

export default function LifePolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPolicy } = useCompare();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/policies/life/${id}`)
      .then((res) => setPolicy(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="p-12 text-[var(--text-muted)]">Loading…</div>;

  if (!policy)
    return <div className="p-12 text-red-500">Policy not found</div>;

  return (
    <div className="min-h-screen px-6 sm:px-10 py-8 bg-[var(--bg-main)] text-[var(--text-main)]">
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
            <ShieldCheck className="text-indigo-600" />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              {policy.policy_name}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {policy.insurer_name}
            </p>

            <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
              {policy.status}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-[var(--text-muted)]">
            Monthly Premium
          </p>
          <p className="text-2xl font-semibold mt-1">
            ₹ {policy.min_monthly_premium} – ₹ {policy.max_monthly_premium}
          </p>

          <div className="flex gap-3 justify-end mt-4">
            {/* COMPARE */}
            <button
              onClick={() => {
                const result = addPolicy("life", policy);
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

            {/* GET QUOTE */}
            <button
              onClick={() =>
                navigate("/quote-summary", {
                  state: {
                    policy: {
                      ...policy,
                      policy_type: "life",
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
          icon={<Users />}
          title="Entry Age"
          value={`${policy.min_entry_age} – ${policy.max_entry_age}`}
        />

        <InfoCard
          icon={<IndianRupee />}
          title="Sum Assured"
          value={`₹ ${policy.min_sum_assured} – ₹ ${policy.max_sum_assured}`}
        />

        <InfoCard
          icon={<Clock />}
          title="Policy Term"
          value={`${policy.min_policy_term} – ${policy.max_policy_term} years`}
        />
      </div>

      {/* POLICY DETAILS */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8 mt-8 space-y-8">
        <Section title="Policy Details">
          <Detail label="Policy Type" value={policy.policy_type} />
          <BooleanFeature label="Smoker Allowed" value={policy.smoker_allowed} />
          <BooleanFeature
            label="Critical Illness Allowed"
            value={policy.critical_illness_allowed}
          />
          <BooleanFeature
            label="Accidental Death Rider"
            value={policy.accidental_death_rider}
          />
          <BooleanFeature
            label="Critical Illness Rider"
            value={policy.critical_illness_rider}
          />
        </Section>
      </div>
    </div>
  );
}

/* ================= UI PARTS ================= */

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6">
      <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <p className="text-sm text-[var(--text-muted)] mt-4">{title}</p>
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

function BooleanFeature({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle
        size={16}
        className={value ? "text-emerald-500" : "text-gray-400"}
      />
      <span
        className={
          value ? "text-[var(--text-main)]" : "text-[var(--text-muted)]"
        }
      >
        {label}
      </span>
    </div>
  );
}

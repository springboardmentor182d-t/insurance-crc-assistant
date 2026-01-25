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

export default function HealthPolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPolicy } = useCompare();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/policies/health/${id}`)
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
          <p className="text-sm text-[var(--text-muted)]">Monthly Premium</p>
          <p className="text-2xl font-semibold mt-1">
            ₹ {policy.monthly_premium}
          </p>

          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => {
                const result = addPolicy("health", policy);
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
                      policy_type: "health",
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
          icon={<IndianRupee />}
          title="Coverage Amount"
          value={`₹ ${policy.min_cover_amount} – ₹ ${policy.max_cover_amount}`}
        />

        <InfoCard
          icon={<Users />}
          title="Family Members Covered"
          value={`Adults: ${policy.max_adults}, Children: ${policy.max_children}, Parents: ${policy.max_parents}`}
        />

        <InfoCard
          icon={<Clock />}
          title="Waiting Period"
          value={`${policy.pre_existing_waiting_months} months`}
        />
      </div>

      {/* POLICY DETAILS */}
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8 mt-8 space-y-8">
        <Section title="Policy Details">
          <Detail
            label="Supported Coverage Types"
            value={policy.supported_coverage_types.join(", ")}
          />
          <Detail
            label="Deductible Type"
            value={policy.deductible_type || "Not Applicable"}
          />
          <Detail
            label="Co-pay Percentage"
            value={`${policy.co_pay_percentage}%`}
          />
          <Detail
            label="Room Rent Limit"
            value={
              policy.room_rent_limit
                ? `₹ ${policy.room_rent_limit}`
                : "No limit"
            }
          />
        </Section>

        <Section title="Maternity">
          <div className="flex items-center gap-2">
            <CheckCircle
              size={16}
              className={
                policy.maternity_supported
                  ? "text-emerald-500"
                  : "text-gray-400"
              }
            />
            <span
              className={
                policy.maternity_supported
                  ? "text-[var(--text-main)]"
                  : "text-[var(--text-muted)]"
              }
            >
              Maternity Coverage
            </span>
          </div>

          {policy.maternity_supported && (
            <Detail
              label="Maternity Waiting Period"
              value={`${policy.maternity_waiting_months} months`}
            />
          )}
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

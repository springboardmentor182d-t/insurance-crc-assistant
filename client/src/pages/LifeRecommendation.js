import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  User,
  HeartPulse,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function LifeRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [saved, setSaved] = useState(false);

  const [policyType, setPolicyType] = useState("Self");
  const [employment, setEmployment] = useState("Salaried");
  const [income, setIncome] = useState(75000);
  const [goal, setGoal] = useState("Income Protection");
  const [coverage, setCoverage] = useState("₹50 Lakhs");
  const [tenure, setTenure] = useState("30 Years");

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12">

      {/* ================= HEADER ================= */}
      <div>
        <button
          onClick={() => navigate("/recommendations")}
          className="
            inline-flex items-center gap-1
            px-3 py-1.5 mb-3
            text-sm font-medium text-gray-500
            rounded-lg
            hover:bg-indigo-50 hover:text-indigo-600
            transition
          "
        >
          ← Back
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">
              Secure Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Future Today
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Tell us about yourself and we’ll help you find the best life
              insurance plan for long-term security.
            </p>
          </div>

          {/* Save Progress */}
          <div className="flex flex-col items-end">
            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
              }}
              className="px-4 py-2 rounded-xl bg-white shadow
                text-sm font-semibold hover:bg-indigo-50 transition"
            >
              Save Progress
            </button>

            {/* Fixed-height message (no layout shift) */}
            <div className="h-5 mt-1">
              {saved && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Progress saved
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= BASIC INFORMATION ================= */}
      <Section
        color="red"
        title="Basic Information"
        subtitle="Who needs life insurance?"
        icon={<Users />}
      >
        <p className="text-xs font-semibold text-red-500">POLICY FOR</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {["Self", "Self + Spouse", "Family"].map((p) => (
            <SelectableCard
              key={p}
              label={p}
              active={policyType === p}
              onClick={() => setPolicyType(p)}
              color="red"
            />
          ))}
        </div>
      </Section>

      {/* ================= PERSONAL DETAILS ================= */}
      <Section
        color="blue"
        title="Personal Details"
        subtitle="Basic personal & employment info"
        icon={<User />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Date of Birth" type="date" />
          <Select label="Gender" value="Male" options={["Male", "Female", "Other"]} />
          <Select
            label="Employment Type"
            value={employment}
            onChange={(e) => setEmployment(e.target.value)}
            options={["Salaried", "Self Employed", "Business Owner"]}
          />
          <Input label="City / Pincode" placeholder="Bangalore / 560001" />
        </div>
      </Section>

      {/* ================= LIFESTYLE ================= */}
      <Section
        color="purple"
        title="Lifestyle & Health"
        subtitle="Understanding your risk profile"
        icon={<HeartPulse />}
      >
        <div className="grid grid-cols-2 gap-4">
          <Toggle label="Tobacco Usage" />
          <Toggle label="Alcohol Consumption" />
        </div>
      </Section>

      {/* ================= FINANCIAL INFO ================= */}
      <Section
        color="green"
        title="Financial Information"
        subtitle="Your income & responsibilities"
        icon={<Wallet />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Annual Income"
            prefix="₹"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Select label="Existing Loans?" value="No" options={["No", "Yes"]} />
        </div>
      </Section>

      {/* ================= PLAN PREFERENCES ================= */}
      <Section
        color="orange"
        title="Plan Preferences"
        subtitle="Customize coverage as per your needs"
        icon={<ShieldCheck />}
      >
        <p className="text-xs font-semibold text-orange-500">COVERAGE GOAL</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          {["Income Protection", "Family Security", "Wealth Creation"].map((g) => (
            <SelectableCard
              key={g}
              label={g}
              active={goal === g}
              onClick={() => setGoal(g)}
              color="orange"
            />
          ))}
        </div>

        <p className="text-xs font-semibold text-orange-500 mt-6">SUM ASSURED</p>
        <div className="flex gap-3 mt-2">
          {["₹50 Lakhs", "₹1 Cr", "₹2 Cr"].map((c) => (
            <SelectableCard
              key={c}
              label={c}
              active={coverage === c}
              onClick={() => setCoverage(c)}
              color="orange"
            />
          ))}
        </div>

        <p className="text-xs font-semibold text-orange-500 mt-6">POLICY TENURE</p>
        <div className="flex gap-3 mt-2">
          {["20 Years", "30 Years", "Till 65"].map((t) => (
            <SelectableCard
              key={t}
              label={t}
              active={tenure === t}
              onClick={() => setTenure(t)}
              color="orange"
            />
          ))}
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <button
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold
        bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95"
      >
        Get Personalized Recommendations
      </button>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, subtitle, color, icon, children }) {
  const styles = {
    red: "bg-red-50 border-red-200 before:bg-red-500",
    blue: "bg-blue-50 border-blue-200 before:bg-blue-500",
    purple: "bg-purple-50 border-purple-200 before:bg-purple-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
    green: "bg-green-50 border-green-200 before:bg-green-500",
  };

  return (
    <div
      className={`relative border rounded-3xl p-8 ${styles[color]}
      before:absolute before:left-0 before:top-0 before:h-full
      before:w-1.5 before:rounded-l-3xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const Input = ({ label, prefix, ...props }) => (
  <div>
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="flex items-center border rounded-2xl px-4 py-3 mt-1 bg-white">
      {prefix && <span className="mr-2 font-semibold">{prefix}</span>}
      <input className="w-full outline-none" {...props} />
    </div>
  </div>
);

const Select = ({ label, options, value, onChange }) => (
  <div>
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full border rounded-2xl px-4 py-3 mt-1 bg-white"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Toggle = ({ label }) => (
  <div>
    <p className="text-xs font-semibold text-gray-600 mb-2">{label}</p>
    <div className="flex gap-3">
      <button className="flex-1 py-3 rounded-xl bg-white border hover:bg-gray-50">
        No
      </button>
      <button className="flex-1 py-3 rounded-xl bg-white border hover:bg-gray-50">
        Yes
      </button>
    </div>
  </div>
);

const SelectableCard = ({ label, active, onClick, color }) => {
  const colors = {
    red: "border-red-500 bg-red-50",
    orange: "border-orange-500 bg-orange-50",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 text-center border transition
        hover:shadow-md hover:-translate-y-1
        ${active ? colors[color] : "bg-white"}`}
    >
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
};

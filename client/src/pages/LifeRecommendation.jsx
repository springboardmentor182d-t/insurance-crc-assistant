import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  User,
  Users,
  Wallet,
  ShieldCheck,
  Cigarette,
  HeartPulse,
} from "lucide-react";

export default function LifeRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [maritalStatus, setMaritalStatus] = useState("married");

  const [dependents, setDependents] = useState(2);
  const [smoker, setSmoker] = useState(false);
  const [criticalIllness, setCriticalIllness] = useState(false);

  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [liabilities, setLiabilities] = useState(500000);

  const [monthlyBudget, setMonthlyBudget] = useState(4500);
  const [policyType, setPolicyType] = useState("term");
  const [policyTerm, setPolicyTerm] = useState(30);

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/liferecresults", {
      state: {
        age,
        gender,
        number_of_dependents: dependents,
        smoker,
        critical_illness: criticalIllness,
        annual_income: annualIncome,
        total_liabilities: liabilities,
        monthly_premium_budget: monthlyBudget,
        preferred_policy_type: policyType,
        preferred_policy_term: policyTerm,
      },
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-10
                    bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* HEADER */}
      <button
        onClick={() => navigate("/recommendations")}
        className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div>
        <h1 className="text-2xl font-bold">
          Get Your{" "}
          <span className="text-[var(--accent)]">
            Life Insurance
          </span>{" "}
          Recommendations
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Secure your family’s financial future with the right cover.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PERSONAL PROFILE */}
        <Card title="Personal Profile" icon={<User size={18} />}>
          <NumberInput label="Your Age" value={age} onChange={setAge} />

          <PillGroup
            label="Gender"
            value={gender}
            setValue={setGender}
            options={["male", "female", "other"]}
          />

          <PillGroup
            label="Marital Status"
            value={maritalStatus}
            setValue={setMaritalStatus}
            options={["single", "married", "divorced", "widowed"]}
          />
        </Card>

        {/* DEPENDENTS & LIFESTYLE */}
        <Card title="Dependents & Lifestyle" icon={<Users size={18} />}>
          <Counter
            label="Number of Dependents"
            value={dependents}
            setValue={setDependents}
          />

          <Toggle label="Smoker" value={smoker} setValue={setSmoker} icon={<Cigarette size={16} />} />
          <Toggle
            label="Critical Illness"
            value={criticalIllness}
            setValue={setCriticalIllness}
            icon={<HeartPulse size={16} />}
          />
        </Card>

        {/* FINANCIAL DETAILS */}
        <Card title="Financial Details" icon={<Wallet size={18} />} full>
          <RangeInput
            label="Annual Income"
            value={annualIncome}
            setValue={setAnnualIncome}
            min={200000}
            max={5000000}
          />

          <NumberInput
            label="Total Liabilities"
            value={liabilities}
            onChange={setLiabilities}
          />
        </Card>

        {/* POLICY PREFERENCES */}
        <Card title="Policy Preferences" icon={<ShieldCheck size={18} />} full>
          <RangeInput
            label="Monthly Premium Budget"
            value={monthlyBudget}
            setValue={setMonthlyBudget}
            min={500}
            max={25000}
          />

          <PillGroup
            label="Policy Type"
            value={policyType}
            setValue={setPolicyType}
            options={["term", "whole_life", "endowment"]}
          />

          <div>
            <p className="text-xs text-[var(--text-muted)] mb-1">
              Preferred Policy Term
            </p>
            <select
              value={policyTerm}
              onChange={(e) => setPolicyTerm(+e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)]
                         border border-[var(--border)]"
            >
              {[10, 15, 20, 25, 30, 35].map((y) => (
                <option key={y} value={y}>
                  {y} Years
                </option>
              ))}
            </select>
          </div>
        </Card>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   shadow-lg hover:scale-[1.03] transition"
      >
        ⚡ GET PERSONALIZED LIFE RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Card({ title, icon, children, full }) {
  return (
    <div className={`bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border)] space-y-5
      ${full ? "lg:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-[var(--accent)]">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function PillGroup({ label, value, setValue, options }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <div className="flex gap-3 flex-wrap">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setValue(o)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold
              ${value === o
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]"}`}
          >
            {o.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)]
                   border border-[var(--border)]"
      />
    </div>
  );
}

function RangeInput({ label, value, setValue, min, max }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <p className="text-lg font-bold text-[var(--accent)]">
        ₹ {value.toLocaleString("en-IN")}
      </p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

function Counter({ label, value, setValue }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">{label}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="px-3 py-1 rounded-full border border-[var(--border)]"
        >
          −
        </button>
        <span className="text-lg font-bold">{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="px-3 py-1 rounded-full border border-[var(--border)]"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Toggle({ label, value, setValue, icon }) {
  return (
    <div className="flex items-center justify-between bg-[var(--bg-main)]
                    rounded-xl px-4 py-3 border border-[var(--border)]">
      <div className="flex items-center gap-2 text-sm">
        {icon}
        {label}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 text-xs rounded-full
            ${!value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : "border border-[var(--border)]"}`}
        >
          No
        </button>
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 text-xs rounded-full
            ${value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : "border border-[var(--border)]"}`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

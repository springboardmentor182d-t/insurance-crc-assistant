import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  User,
  Wallet,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function LifeRecommendation() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Coverage basics
  const [policyType, setPolicyType] = useState("Self");
  const [dependents, setDependents] = useState(0);

  // Personal
  const [ageGroup, setAgeGroup] = useState("30-45");
  const [employment, setEmployment] = useState("Salaried");
  const [income, setIncome] = useState(75000);

  // Goals
  const [goal, setGoal] = useState("Income Protection");
  const [riskAppetite, setRiskAppetite] = useState("Low");

  // Coverage
  const [coverage, setCoverage] = useState("₹50 Lakhs");
  const [tenure, setTenure] = useState("30 Years");

  // Liabilities
  const [hasLoans, setHasLoans] = useState("No");

  // Lifestyle
  const [tobacco, setTobacco] = useState("No");
  const [alcohol, setAlcohol] = useState("No");

  // Budget
  const [premium, setPremium] = useState(20000);

  /* ================= LOAD SAVED PROGRESS ================= */
  useEffect(() => {
    axios
      .get("/api/life/load-progress")
      .then((res) => {
        if (!res.data?.data) return;
        const d = res.data.data;

        setPolicyType(d.policyType);
        setDependents(d.dependents);
        setAgeGroup(d.ageGroup);
        setEmployment(d.employment);
        setIncome(d.income);
        setGoal(d.goal);
        setRiskAppetite(d.riskAppetite);
        setCoverage(d.coverage);
        setTenure(d.tenure);
        setHasLoans(d.hasLoans);
        setTobacco(d.tobacco);
        setAlcohol(d.alcohol);
        setPremium(d.premium);
      })
      .catch(() => {});
  }, []);

  /* ================= SAVE PROGRESS ================= */
  const saveProgress = async () => {
    const res = await axios.post("/api/life/save-progress", {
      policyType,
      dependents,
      ageGroup,
      employment,
      income,
      goal,
      riskAppetite,
      coverage,
      tenure,
      hasLoans,
      tobacco,
      alcohol,
      premium,
    });

    if (res.data?.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12">
      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate("/recommendations")}
          className="px-3 py-1.5 mb-3 text-sm text-gray-500 rounded-lg hover:bg-indigo-50"
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
              Answer a few questions and we’ll recommend the best life insurance plans.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={saveProgress}
              className="px-4 py-2 rounded-xl bg-white shadow text-sm font-semibold hover:bg-indigo-50"
            >
              Save Progress
            </button>
            {saved && (
              <p className="text-sm text-green-600 font-medium mt-1">
                ✓ Progress saved
              </p>
            )}
          </div>
        </div>
      </div>

      {/* COVERAGE BASICS */}
      <Section color="red" title="Coverage Basics" subtitle="Who depends on you?" icon={<Users />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {["Self", "Self + Spouse", "Family"].map((p) => (
            <SelectableCard key={p} label={p} active={policyType === p} onClick={() => setPolicyType(p)} />
          ))}
        </div>
        <Input label="👨‍👩‍👧 Dependents Count" type="number" value={dependents} onChange={(e) => setDependents(+e.target.value)} />
      </Section>

      {/* PERSONAL */}
      <Section color="blue" title="Personal Details" subtitle="Age, job & income" icon={<User />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Select label="🎂 Age Group" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} options={["18-30","30-45","45-60","60+"]} />
          <Select label="💼 Employment" value={employment} onChange={(e) => setEmployment(e.target.value)} options={["Salaried","Self Employed","Business Owner"]} />
          <Input label="💰 Monthly Income" prefix="₹" value={income} onChange={(e) => setIncome(+e.target.value)} />
        </div>
      </Section>

      {/* GOALS */}
      <Section color="orange" title="Financial Goals" subtitle="What matters most?" icon={<ShieldCheck />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Income Protection","Family Security","Wealth Creation"].map((g) => (
            <SelectableCard key={g} label={g} active={goal === g} onClick={() => setGoal(g)} />
          ))}
        </div>
        <Select label="📊 Risk Appetite" value={riskAppetite} onChange={(e) => setRiskAppetite(e.target.value)} options={["Low","Medium","High"]} />
      </Section>

      {/* RISK */}
      <Section color="purple" title="Risk Factors" subtitle="Loans & lifestyle habits" icon={<AlertTriangle />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Toggle label="Any Existing Loans?" value={hasLoans} setValue={setHasLoans} />
          <Toggle label="Tobacco Usage" value={tobacco} setValue={setTobacco} />
          <Toggle label="Alcohol Consumption" value={alcohol} setValue={setAlcohol} />
        </div>
      </Section>

      {/* BUDGET */}
      <Section color="green" title="Coverage & Budget" subtitle="Sum assured & affordability" icon={<Wallet />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Select label="🛡 Sum Assured" value={coverage} onChange={(e) => setCoverage(e.target.value)} options={["₹50 Lakhs","₹1 Cr","₹2 Cr"]} />
          <Select label="⏳ Policy Tenure" value={tenure} onChange={(e) => setTenure(e.target.value)} options={["20 Years","30 Years","Till 65"]} />
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-green-600">TARGET ANNUAL PREMIUM</p>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full">₹{premium}</span>
          </div>
          <input type="range" min="500" max="100000" step="500" value={premium} onChange={(e) => setPremium(+e.target.value)} className="w-full accent-green-500 mt-3" />
        </div>
      </Section>

      <button
        onClick={() => navigate("/liferecresults", { state: { policyType, dependents, ageGroup, employment, income, goal, riskAppetite, coverage, tenure, hasLoans, tobacco, alcohol, premium } })}
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95"
      >
        Get Personalized Recommendations
      </button>
    </div>
  );
}

/* ================= HELPERS (COLOR SAFE) ================= */

function Section({ title, subtitle, icon, color, children }) {
  const map = {
    red: "bg-red-50 border-red-200 before:bg-red-500",
    blue: "bg-blue-50 border-blue-200 before:bg-blue-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
    purple: "bg-purple-50 border-purple-200 before:bg-purple-500",
    green: "bg-green-50 border-green-200 before:bg-green-500",
  };

  return (
    <div className={`relative border rounded-3xl p-8 ${map[color]}
      before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-3xl`}>
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
    <select value={value} onChange={onChange} className="w-full border rounded-2xl px-4 py-3 mt-1 bg-white">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const Toggle = ({ label, value, setValue }) => (
  <div>
    <p className="text-xs font-semibold text-gray-600 mb-2">{label}</p>
    <div className="flex gap-3">
      {["No","Yes"].map((v) => (
        <button key={v} onClick={() => setValue(v)}
          className={`flex-1 py-3 rounded-xl border transition ${
            value === v ? "bg-indigo-500 text-white border-indigo-500" : "bg-white hover:bg-gray-50"
          }`}>
          {v}
        </button>
      ))}
    </div>
  </div>
);

const SelectableCard = ({ label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-2xl p-4 text-center border transition ${
      active ? "bg-indigo-50 border-indigo-500" : "bg-white hover:bg-gray-50"
    }`}
  >
    <p className="font-semibold text-sm">{label}</p>
  </div>
);

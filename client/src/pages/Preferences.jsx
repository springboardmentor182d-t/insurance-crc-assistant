import { useState } from "react";
import {
  Heart,
  Shield,
  Car,
  Plane,
  Home,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const navigate = useNavigate();

  const [insuranceTypes, setInsuranceTypes] = useState(["Health"]);
  const [budget, setBudget] = useState(25000);
  const [coverage, setCoverage] = useState(500000);
  const [risk, setRisk] = useState("Medium");

  const toggleType = (type) => {
    setInsuranceTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSave = () => {
    const data = {
      insuranceTypes,
      annualBudget: budget,
      desiredCoverage: coverage,
      riskAppetite: risk,
    };

    console.log("Saved Preferences:", data);
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border w-full max-w-3xl p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Set Your Preferences</h1>
          <p className="text-sm text-gray-500 mt-1">
            Help us recommend the best policies for your needs
          </p>
        </div>

        {/* INSURANCE TYPES */}
        <Section title="Insurance Types">
          <div className="grid grid-cols-5 gap-4">
            <TypeCard icon={<Heart />} label="Health"
              active={insuranceTypes.includes("Health")}
              onClick={() => toggleType("Health")}
            />
            <TypeCard icon={<Shield />} label="Life"
              active={insuranceTypes.includes("Life")}
              onClick={() => toggleType("Life")}
            />
            <TypeCard icon={<Car />} label="Auto"
              active={insuranceTypes.includes("Auto")}
              onClick={() => toggleType("Auto")}
            />
            <TypeCard icon={<Plane />} label="Travel"
              active={insuranceTypes.includes("Travel")}
              onClick={() => toggleType("Travel")}
            />
            <TypeCard icon={<Home />} label="Home"
              active={insuranceTypes.includes("Home")}
              onClick={() => toggleType("Home")}
            />
          </div>
        </Section>

        {/* ANNUAL BUDGET */}
        <Section title="Annual Budget" value={`₹ ${budget.toLocaleString()}`}>
          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}
            className="w-full accent-blue-600"
          />
          <RangeLabels left="₹5,000" right="₹1,00,000" />
        </Section>

        {/* COVERAGE */}
        <Section title="Desired Coverage" value={`₹ ${coverage.toLocaleString()}`}>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={coverage}
            onChange={(e) => setCoverage(+e.target.value)}
            className="w-full accent-blue-600"
          />
          <RangeLabels left="₹1L" right="₹1Cr" />
        </Section>

        {/* RISK */}
        <Section title="Risk Appetite">
          <div className="grid grid-cols-3 gap-4">
            <RiskCard icon={<TrendingDown />} title="Low"
              subtitle="Conservative coverage"
              active={risk === "Low"}
              onClick={() => setRisk("Low")}
            />
            <RiskCard icon={<Minus />} title="Medium"
              subtitle="Balanced approach"
              active={risk === "Medium"}
              onClick={() => setRisk("Medium")}
            />
            <RiskCard icon={<TrendingUp />} title="High"
              subtitle="Comprehensive coverage"
              active={risk === "High"}
              onClick={() => setRisk("High")}
            />
          </div>
        </Section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 rounded-lg border">
            Skip for Now
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Section({ title, value, children }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        {value && <span className="text-blue-600 text-sm">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function TypeCard({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 rounded-xl border flex flex-col items-center gap-2
        ${active ? "bg-orange-50 border-orange-400 text-orange-600" : "hover:bg-gray-50"}
      `}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function RiskCard({ icon, title, subtitle, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border text-center
        ${active ? "bg-orange-50 border-orange-400" : "hover:bg-gray-50"}
      `}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </button>
  );
}

function RangeLabels({ left, right }) {
  return (
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

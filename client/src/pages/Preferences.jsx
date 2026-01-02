import { useEffect, useState } from "react";
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
import {
  getInsuranceTypes,
  getPreferences,
  savePreferences,
} from "../services/preferencesService";

/* ICON MAP FROM BACKEND TYPE */
const ICON_MAP = {
  Health: <Heart />,
  Life: <Shield />,
  Auto: <Car />,
  Travel: <Plane />,
  Home: <Home />,
};

export default function Preferences() {
  const navigate = useNavigate();

  const [availableTypes, setAvailableTypes] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [budget, setBudget] = useState(25000);
  const [coverage, setCoverage] = useState(500000);
  const [risk, setRisk] = useState("Medium");

  /* ---------------- LOAD FROM BACKEND ---------------- */
  useEffect(() => {
    // Insurance Types
    getInsuranceTypes()
      .then(setAvailableTypes)
      .catch(() => setAvailableTypes([]));

    // Saved Preferences
    getPreferences()
      .then((data) => {
        if (!data) return;
        setInsuranceTypes(data.insuranceTypes || []);
        setBudget(data.annualBudget || 25000);
        setCoverage(data.desiredCoverage || 500000);
        setRisk(data.riskAppetite || "Medium");
      })
      .catch(() => {});
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const toggleType = (type) => {
    setInsuranceTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSave = async () => {
    await savePreferences({
      insuranceTypes,
      annualBudget: budget,
      desiredCoverage: coverage,
      riskAppetite: risk,
    });

    navigate("/recommendations");
  };

  const handleSkip = () => {
    navigate("/profile");
  };

  /* ---------------- UI ---------------- */
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
            {availableTypes.map((type) => (
              <TypeCard
                key={type}
                icon={ICON_MAP[type]}
                label={type}
                active={insuranceTypes.includes(type)}
                onClick={() => toggleType(type)}
              />
            ))}
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
        </Section>

        {/* COVERAGE */}
        <Section
          title="Desired Coverage"
          value={`₹ ${coverage.toLocaleString()}`}
        >
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={coverage}
            onChange={(e) => setCoverage(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </Section>

        {/* RISK */}
        <Section title="Risk Appetite">
          <div className="grid grid-cols-3 gap-4">
            <RiskCard
              icon={<TrendingDown />}
              title="Low"
              active={risk === "Low"}
              onClick={() => setRisk("Low")}
            />
            <RiskCard
              icon={<Minus />}
              title="Medium"
              active={risk === "Medium"}
              onClick={() => setRisk("Medium")}
            />
            <RiskCard
              icon={<TrendingUp />}
              title="High"
              active={risk === "High"}
              onClick={() => setRisk("High")}
            />
          </div>
        </Section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleSkip}
            className="px-6 py-2 rounded-lg border hover:bg-gray-50"
          >
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

/* ---------------- HELPERS ---------------- */

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
        ${
          active
            ? "bg-orange-50 border-orange-400 text-orange-600"
            : "hover:bg-gray-50"
        }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function RiskCard({ icon, title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border text-center
        ${
          active
            ? "bg-orange-50 border-orange-400"
            : "hover:bg-gray-50"
        }`}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <h4 className="font-medium">{title}</h4>
    </button>
  );
}

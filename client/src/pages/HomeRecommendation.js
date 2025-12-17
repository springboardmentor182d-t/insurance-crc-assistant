import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Key,
  Landmark,
  ShieldCheck,
  Flame,
  Camera,
  UserCheck,
  Ban,
  Check,
} from "lucide-react";

export default function PropertyRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [saved, setSaved] = useState(false);

  const [propertyType, setPropertyType] = useState("Apartment");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");

  const [coverage, setCoverage] = useState("Structure");
  const [sumInsured, setSumInsured] = useState("");
  const [security, setSecurity] = useState("Fire Alarm");

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12">

      {/* ================= HEADER ================= */}
      <div>
        <button
          onClick={() => navigate("/recommendations")}
          className="inline-flex items-center gap-1 px-3 py-1.5 mb-3
            text-sm font-medium text-gray-500 rounded-lg
            hover:bg-indigo-50 hover:text-indigo-600 transition"
        >
          ← Back
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">
              Protect Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Complete the questionnaire below to receive a tailored property
              insurance quote that keeps your assets safe.
            </p>
          </div>

          <div className="relative">
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

            <div className="absolute left-0 right-0 mt-1 text-center">
              {saved && (
                <p className="text-xs text-green-600 font-medium">
                  ✓ Progress saved
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PROPERTY DETAILS ================= */}
      <Section
        title="Property Details"
        subtitle="Basic information about the property"
        color="red"
        icon={<Home />}
      >
        <p className="text-xs font-semibold text-red-500">PROPERTY TYPE</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[
            { label: "Apartment", icon: Building2 },
            { label: "Independent House", icon: Home },
            { label: "Rented Home", icon: Key },
            { label: "Owned Home", icon: Landmark },
          ].map(({ label, icon: Icon }) => (
            <SelectableCard
              key={label}
              label={label}
              icon={<Icon size={18} />}
              active={propertyType === label}
              onClick={() => setPropertyType(label)}
              color="red"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Input
            label="Property Age (Years)"
            placeholder="e.g. 5"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            label="Built-up Area (sq ft)"
            placeholder="e.g. 1500"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <Input
            label="City / ZIP"
            placeholder="e.g. New York, 10001"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </Section>

      {/* ================= COVERAGE NEEDS ================= */}
      <Section
        title="Coverage Needs"
        subtitle="Customize features for your property"
        color="orange"
        icon={<ShieldCheck />}
      >
        <p className="text-xs font-semibold text-orange-500">
          COVERAGE FOR
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          {[
            { label: "Structure", icon: Home },
            { label: "Household Contents", icon: Building2 },
            { label: "Jewelry & Valuables", icon: Landmark },
            { label: "Electronics", icon: Camera },
            { label: "Rent / Accommodation", icon: Key },
          ].map(({ label, icon: Icon }) => (
            <SelectableCard
              key={label}
              label={label}
              icon={<Icon size={18} />}
              active={coverage === label}
              onClick={() => setCoverage(label)}
              color="orange"
            />
          ))}
        </div>

        <Input
          label="Preferred Sum Insured"
          prefix="₹"
          placeholder="Enter amount"
          value={sumInsured}
          onChange={(e) => setSumInsured(e.target.value)}
        />

        <p className="text-xs font-semibold text-orange-500 mt-6">
          SECURITY FEATURES
        </p>

        <div className="flex flex-wrap gap-3 mt-2">
          {[
            { label: "Fire Alarm", icon: Flame },
            { label: "CCTV", icon: Camera },
            { label: "Guard", icon: UserCheck },
            { label: "No Security Measures", icon: Ban },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setSecurity(label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border transition
                ${
                  security === label
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white hover:bg-orange-50"
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
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
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
  };

  return (
    <div
      className={`relative border rounded-3xl p-8 ${styles[color]}
      before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-3xl`}
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

const SelectableCard = ({ label, icon, active, onClick, color }) => {
  const colors = {
    red: "border-red-500 bg-red-50",
    orange: "border-orange-500 bg-orange-50",
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl p-4 text-center border transition
        hover:shadow-md hover:-translate-y-1
        ${active ? colors[color] : "bg-white"}`}
    >
      {active && (
        <span className="absolute -top-2 -right-2 bg-current text-white rounded-full p-1">
          <Check size={12} />
        </span>
      )}
      <div className="w-9 h-9 mx-auto mb-2 rounded-full bg-white shadow flex items-center justify-center">
        {icon}
      </div>
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
};

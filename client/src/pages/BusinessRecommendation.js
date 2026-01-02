import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Store,
  Factory,
  Warehouse,
  Briefcase,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function BusinessRecommendation() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  /* ================= STATE ================= */
  const [businessType, setBusinessType] = useState("Retail");
  const [businessSize, setBusinessSize] = useState("Small");
  const [revenue, setRevenue] = useState("");
  const [address, setAddress] = useState("");

  const [coverage, setCoverage] = useState([]);
  const [existingInsurance, setExistingInsurance] = useState("No");
  const [assetsValue, setAssetsValue] = useState("");

  const toggle = (val, list, setList) => {
    setList(
      list.includes(val)
        ? list.filter((v) => v !== val)
        : [...list, val]
    );
  };

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
              Secure Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Business Future
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Complete the questionnaire to receive a tailored commercial
              insurance quote that keeps your operations safe.
            </p>
          </div>

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

            <div className="h-6 mt-1">
              {saved && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Progress saved
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= BUSINESS DETAILS ================= */}
      <Section
        title="Business Details"
        subtitle="Basic information about your business entity"
        color="red"
        icon={<Building2 />}
      >
        <p className="text-xs font-semibold text-red-500">BUSINESS TYPE</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {[
            { label: "Retail", icon: Store },
            { label: "Office", icon: Briefcase },
            { label: "Manufacturing", icon: Factory },
            { label: "Warehouse", icon: Warehouse },
            { label: "IT Services", icon: Lock },
            { label: "Other", icon: Building2 },
          ].map((b) => {
            const Icon = b.icon;
            const active = businessType === b.label;

            return (
              <SelectableCard
                key={b.label}
                active={active}
                onClick={() => setBusinessType(b.label)}
                color="red"
              >
                <Icon size={18} />
                {b.label}
              </SelectableCard>
            );
          })}
        </div>

        <p className="text-xs font-semibold text-red-500 mt-6">BUSINESS SIZE</p>
        <div className="grid grid-cols-3 gap-4 mt-3">
          {["Small", "Medium", "Large"].map((s) => (
            <SelectableCard
              key={s}
              active={businessSize === s}
              onClick={() => setBusinessSize(s)}
              color="red"
            >
              {s}
            </SelectableCard>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input
            label="Annual Revenue"
            prefix="$"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
          <Input
            label="Business Address (City / ZIP)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </Section>

      {/* ================= COVERAGE REQUIREMENTS ================= */}
      <Section
        title="Coverage Requirements"
        subtitle="Select specific risks and protection needs"
        color="orange"
        icon={<ShieldCheck />}
      >
        <p className="text-xs font-semibold text-orange-500">
          COVERAGE REQUIRED FOR
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {[
            "Property Damage",
            "Fire",
            "Machinery Breakdown",
            "Theft / Burglary",
            "Liability Cover",
            "Employee Safety",
            "Cyber Insurance",
            "Business Interruption",
          ].map((c) => (
            <SelectableCard
              key={c}
              active={coverage.includes(c)}
              onClick={() => toggle(c, coverage, setCoverage)}
              color="orange"
            >
              {c}
            </SelectableCard>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input
            label="Value of Assets / Inventory"
            prefix="$"
            value={assetsValue}
            onChange={(e) => setAssetsValue(e.target.value)}
          />

          <div>
            <p className="text-xs font-semibold text-orange-500 mb-2">
              EXISTING INSURANCE?
            </p>
            <div className="flex gap-3">
              {["No", "Yes"].map((v) => (
                <button
                  key={v}
                  onClick={() => setExistingInsurance(v)}
                  className={`flex-1 py-3 rounded-xl font-semibold border
                    ${
                      existingInsurance === v
                        ? "bg-orange-500 text-white"
                        : "bg-white hover:bg-orange-50"
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <button
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold
        bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95"
      >
        Get Personalized Recommendations
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        🔒 Your information is secure and encrypted
      </p>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, subtitle, color, icon, children }) {
  const map = {
    red: "bg-red-50 border-red-200 before:bg-red-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
  };

  return (
    <div
      className={`relative border rounded-3xl p-8 ${map[color]}
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

const SelectableCard = ({ children, active, onClick, color }) => {
  const colors = {
    red: "border-red-500 bg-red-50",
    orange: "border-orange-500 bg-orange-50",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 text-center border
        transition hover:shadow-md hover:-translate-y-1
        ${active ? colors[color] : "bg-white"}`}
    >
      <div className="flex flex-col items-center gap-2 text-sm font-semibold">
        {children}
      </div>
    </div>
  );
};

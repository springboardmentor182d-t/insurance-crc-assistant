import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Factory,
  Building2,
  ShieldCheck,
  Flame,
  Zap,
  CloudRain,
  Lock,
  Cpu,
} from "lucide-react";

export default function FirePropertyRecommendation() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  /* ================= STATE ================= */
  const [propertyType, setPropertyType] = useState("Residential");
  const [constructionType, setConstructionType] = useState("RCC");
  const [propertyAge, setPropertyAge] = useState("");
  const [location, setLocation] = useState("");

  const [coverage, setCoverage] = useState([]);
  const [stockValue, setStockValue] = useState("");
  const [machineryValue, setMachineryValue] = useState("");
  const [totalSum, setTotalSum] = useState("");

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
                Assets & Future
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Complete the questionnaire below to receive a tailored fire and
              property insurance quote that keeps your investments safe.
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

      {/* ================= PROPERTY DETAILS ================= */}
      <Section
        title="Property Details"
        subtitle="Basic information about the property"
        color="red"
        icon={<Building2 />}
      >
        <p className="text-xs font-semibold text-red-500">PROPERTY TYPE</p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "Residential", icon: Home },
            { label: "Commercial", icon: Building2 },
            { label: "Industrial", icon: Factory },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <Selectable
                key={p.label}
                label={p.label}
                icon={Icon}
                active={propertyType === p.label}
                onClick={() => setPropertyType(p.label)}
                color="red"
              />
            );
          })}
        </div>

        <p className="text-xs font-semibold text-red-500 mt-6">
          CONSTRUCTION TYPE
        </p>

        <div className="grid grid-cols-3 gap-4 mt-3">
          {["RCC", "Mixed", "Wooden"].map((c) => (
            <SelectableSimple
              key={c}
              label={c}
              active={constructionType === c}
              onClick={() => setConstructionType(c)}
              color="red"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input
            label="Property Age (Years)"
            placeholder="e.g. 5"
            value={propertyAge}
            onChange={(e) => setPropertyAge(e.target.value)}
          />
          <Input
            label="Location (City / ZIP)"
            placeholder="e.g. New York, 10001"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </Section>

      {/* ================= COVERAGE ================= */}
      <Section
        title="Coverage Requirements"
        subtitle="Select risks and valuation for coverage"
        color="orange"
        icon={<ShieldCheck />}
      >
        <p className="text-xs font-semibold text-orange-500">
          WANT COVERAGE FOR
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {[
            { label: "Fire", icon: Flame },
            { label: "Explosion", icon: Zap },
            { label: "Lightning", icon: Zap },
            { label: "Natural Disasters", icon: CloudRain },
            { label: "Burglary", icon: Lock },
            { label: "Electronic Equip.", icon: Cpu },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <Selectable
                key={c.label}
                label={c.label}
                icon={Icon}
                active={coverage.includes(c.label)}
                onClick={() => toggle(c.label, coverage, setCoverage)}
                color="orange"
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Input
            label="Stock / Inventory Value"
            prefix="$"
            placeholder="If applicable"
            value={stockValue}
            onChange={(e) => setStockValue(e.target.value)}
          />
          <Input
            label="Machinery Value"
            prefix="$"
            placeholder="If applicable"
            value={machineryValue}
            onChange={(e) => setMachineryValue(e.target.value)}
          />
          <Input
            label="Total Sum Insured"
            prefix="$"
            placeholder="Total required"
            value={totalSum}
            onChange={(e) => setTotalSum(e.target.value)}
          />
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

function Section({ title, subtitle, icon, color, children }) {
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

function Input({ label, prefix, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600">{label}</label>
      <div className="flex items-center border rounded-2xl px-4 py-3 mt-1 bg-white">
        {prefix && <span className="mr-2 font-semibold">{prefix}</span>}
        <input className="w-full outline-none" {...props} />
      </div>
    </div>
  );
}

function Selectable({ label, icon: Icon, active, onClick, color }) {
  const colors = {
    red: "border-red-500 bg-red-50",
    orange: "border-orange-500 bg-orange-50",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-5 text-center border transition
      hover:shadow-md hover:-translate-y-1
      ${active ? colors[color] : "bg-white"}`}
    >
      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon size={18} />
      </div>
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
}

function SelectableSimple({ label, active, onClick, color }) {
  const colors = {
    red: "border-red-500 bg-red-50",
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
}

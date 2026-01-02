import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Bike, Shield, Gauge, Check } from "lucide-react";

export default function MotorRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [saved, setSaved] = useState(false);

  const [vehicleType, setVehicleType] = useState("Car");
  const [usage, setUsage] = useState(35);
  const [ownership, setOwnership] = useState("Owned");
  const [claims, setClaims] = useState("No");
  const [ncb, setNcb] = useState("50%");
  const [plan, setPlan] = useState("Comprehensive");
  const [addons, setAddons] = useState(["Roadside Assistance"]);
  const [idv, setIdv] = useState("Recommended");

  const toggleAddon = (val) => {
    setAddons((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

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
              Protect Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Ride
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Tell us about your vehicle to get accurate motor insurance
              recommendations.
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

            {/* Fixed height to avoid layout shift */}
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

      {/* ================= VEHICLE DETAILS ================= */}
      <Section
        title="Vehicle Details"
        subtitle="Basic information"
        color="blue"
        icon={<Car />}
      >
        <div className="grid grid-cols-2 gap-4">
          {["Car", "Bike"].map((v) => (
            <Selectable
              key={v}
              label={v}
              icon={v === "Car" ? Car : Bike}
              active={vehicleType === v}
              onClick={() => setVehicleType(v)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input label="Make & Model" />
          <Input label="Year of Manufacture" />
          <Input label="Registration Number" />
          <Input label="City / Pincode" />
        </div>
      </Section>

      {/* ================= USAGE ================= */}
      <Section
        title="Usage & Condition"
        subtitle="How you use your vehicle"
        color="purple"
        icon={<Gauge />}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-purple-500">
            DAILY USAGE
          </p>
          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
            {usage} km/day
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="100"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="w-full mt-4 accent-purple-500"
        />

        <div className="grid grid-cols-2 gap-6 mt-6">
          <Toggle
            label="Ownership"
            options={["Owned", "Loan"]}
            value={ownership}
            onChange={setOwnership}
          />
          <Toggle
            label="Claims Last Year"
            options={["No", "Yes"]}
            value={claims}
            onChange={setClaims}
          />
        </div>

        <div className="grid grid-cols-5 gap-3 mt-6">
          {["0%", "20%", "25%", "35%", "50%"].map((p) => (
            <button
              key={p}
              onClick={() => setNcb(p)}
              className={`rounded-xl py-3 border ${
                ncb === p
                  ? "bg-purple-500 text-white"
                  : "bg-white hover:bg-purple-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Section>

      {/* ================= PLAN ================= */}
      <Section
        title="Plan Preferences"
        subtitle="Coverage & add-ons"
        color="orange"
        icon={<Shield />}
      >
        <div className="grid grid-cols-3 gap-4">
          {["Third Party", "Comprehensive", "Own Damage"].map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`rounded-2xl p-4 border ${
                plan === p
                  ? "bg-orange-50 border-orange-500"
                  : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {[
            "Zero Depreciation",
            "Engine Protection",
            "Roadside Assistance",
          ].map((a) => (
            <button
              key={a}
              onClick={() => toggleAddon(a)}
              className={`px-4 py-2 rounded-full font-semibold ${
                addons.includes(a)
                  ? "bg-orange-500 text-white"
                  : "bg-white border"
              }`}
            >
              + {a}
            </button>
          ))}
        </div>

        <p className="text-xs font-semibold text-orange-500 mt-6">
          PREFERRED IDV
        </p>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {["Recommended", "Low IDV", "High IDV"].map((v) => (
            <button
              key={v}
              onClick={() => setIdv(v)}
              className={`rounded-xl p-4 border ${
                idv === v
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <button className="w-full py-4 rounded-2xl text-white text-lg font-semibold
        bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95">
        Get Personalized Recommendations
      </button>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

function Section({ title, subtitle, icon, color, children }) {
  const colors = {
    blue: "bg-blue-50 border-blue-200 before:bg-blue-500",
    purple: "bg-purple-50 border-purple-200 before:bg-purple-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
  };

  return (
    <div
      className={`relative border rounded-3xl p-8 ${colors[color]}
      before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-3xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 bg-white rounded-xl shadow flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Input({ label }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input className="w-full mt-1 rounded-2xl border px-4 py-3" />
    </div>
  );
}

function Toggle({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-xs font-semibold mb-2">{label}</p>
      <div className="flex bg-white rounded-2xl p-1 shadow-inner">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              value === o
                ? "bg-purple-500 text-white"
                : "hover:bg-gray-50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Selectable({ label, icon: Icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-6 text-center border relative
        transition hover:shadow-md hover:-translate-y-1
        ${active ? "border-blue-500 bg-blue-50 shadow" : "bg-white"}`}
    >
      {active && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
          <Check size={12} />
        </span>
      )}
      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon size={18} />
      </div>
      <p className="font-semibold">{label}</p>
    </div>
  );
}

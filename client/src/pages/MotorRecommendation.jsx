import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Car,
  Gauge,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function AutoRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [vehicleType, setVehicleType] = useState("car");
  const [fuelType, setFuelType] = useState("petrol");
  const [vehicleAge, setVehicleAge] = useState(2);

  const [dailyUsage, setDailyUsage] = useState(45);
  const [claimLastYear, setClaimLastYear] = useState(false);

  const [coverageType, setCoverageType] = useState("comprehensive");
  const [idvPreference, setIdvPreference] = useState("recommended");

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/motorrecresults", {
      state: {
        vehicle_type: vehicleType,
        fuel_type: fuelType,
        vehicle_age: vehicleAge,
        daily_usage_km: dailyUsage,
        claim_last_year: claimLastYear,
        preferred_coverage_type: coverageType,
        idv_preference: idvPreference,
      },
    });
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-10
                 bg-[var(--bg-main)] text-[var(--text-main)]"
    >
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
            Motor Insurance
          </span>{" "}
          Recommendations
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Find the right protection for your vehicle.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* VEHICLE ELIGIBILITY */}
        <Card title="Vehicle Eligibility" icon={<Car size={18} />}>
          <PillRow
            value={vehicleType}
            setValue={setVehicleType}
            options={["car", "bike"]}
          />

          <PillGroup
            label="Fuel Type"
            value={fuelType}
            setValue={setFuelType}
            options={["petrol", "diesel", "electric", "hybrid"]}
          />

          <NumberInput
            label="Vehicle Age (Years)"
            value={vehicleAge}
            onChange={setVehicleAge}
          />
        </Card>

        {/* USAGE & RISK */}
        <Card title="Usage & Risk" icon={<Gauge size={18} />}>
          <RangeInput
            label="Daily Usage (km)"
            value={dailyUsage}
            setValue={setDailyUsage}
            min={5}
            max={200}
            suffix="km"
          />

          <Toggle
            label="Claim in Last Year?"
            value={claimLastYear}
            setValue={setClaimLastYear}
          />
        </Card>

        {/* COVERAGE */}
        <Card title="Coverage Preference" icon={<ShieldCheck size={18} />} full>
          <PillRow
            value={coverageType}
            setValue={setCoverageType}
            options={[
              "third_party",
              "comprehensive",
              "own_damage",
            ]}
            labels={{
              third_party: "Third Party",
              comprehensive: "Comprehensive",
              own_damage: "Own Damage",
            }}
          />
        </Card>

        {/* IDV */}
        <Card title="IDV Preference" icon={<AlertTriangle size={18} />} full>
          <PillRow
            value={idvPreference}
            setValue={setIdvPreference}
            options={["low", "recommended", "high"]}
          />
        </Card>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   shadow-lg hover:scale-[1.03] transition"
      >
        ⚡ GET PERSONALIZED MOTOR RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Card({ title, icon, children, full }) {
  return (
    <div
      className={`bg-[var(--bg-card)] rounded-3xl p-6 space-y-5
                  border border-[var(--border)]
                  ${full ? "lg:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-[var(--accent)]">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function PillRow({ value, setValue, options, labels = {} }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setValue(o)}
          className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold
            ${
              value === o
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]"
            }`}
        >
          {(labels[o] ?? o).replace("_", " ").toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function PillGroup({ label, value, setValue, options }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <PillRow value={value} setValue={setValue} options={options} />
    </div>
  );
}

function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full px-4 py-2 rounded-xl
                   bg-[var(--bg-main)]
                   border border-[var(--border)]"
      />
    </div>
  );
}

function RangeInput({ label, value, setValue, min, max, suffix }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <p className="text-lg font-bold text-[var(--accent)]">
        {value} {suffix}
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

function Toggle({ label, value, setValue }) {
  return (
    <div
      className="flex items-center justify-between
                 bg-[var(--bg-main)] rounded-xl px-4 py-3
                 border border-[var(--border)]"
    >
      <span className="text-sm">{label}</span>
      <div className="flex gap-2">
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 text-xs rounded-full
            ${
              !value
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "border border-[var(--border)]"
            }`}
        >
          No
        </button>
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 text-xs rounded-full
            ${
              value
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "border border-[var(--border)]"
            }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

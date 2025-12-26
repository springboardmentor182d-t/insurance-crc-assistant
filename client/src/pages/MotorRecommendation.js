import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Car,
  Bike,
  Shield,
  Gauge,
  Check,
  Wallet,
} from "lucide-react";

export default function MotorRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [saved, setSaved] = useState(false);

  // Vehicle
  const [vehicleType, setVehicleType] = useState("Car");
  const [fuelType, setFuelType] = useState("Petrol");
  const [year, setYear] = useState("2020");

  // Usage & Risk
  const [usage, setUsage] = useState(35);
  const [ownership, setOwnership] = useState("Owned");
  const [claims, setClaims] = useState("No");
  const [ncb, setNcb] = useState("50%");
  const [garage, setGarage] = useState("Yes");
  const [antiTheft, setAntiTheft] = useState("Yes");

  // Plan
  const [plan, setPlan] = useState("Comprehensive");
  const [addons, setAddons] = useState(["Roadside Assistance"]);
  const [idv, setIdv] = useState("Recommended");

  // Budget
  const [premium, setPremium] = useState(15000);

  const vehicleAge = new Date().getFullYear() - Number(year);

  /* ================= LOAD PROGRESS ================= */
  useEffect(() => {
    axios
      .get("/api/motor/load-progress")
      .then((res) => {
        if (!res.data?.data) return;
        const d = res.data.data;

        setVehicleType(d.vehicleType);
        setFuelType(d.fuelType);
        setYear(String(new Date().getFullYear() - d.vehicleAge));

        setUsage(d.usage);
        setOwnership(d.ownership);
        setClaims(d.claims);
        setNcb(d.ncb);
        setGarage(d.garage);
        setAntiTheft(d.antiTheft);

        setPlan(d.plan);
        setAddons(d.addons || []);
        setIdv(d.idv);
        setPremium(d.premium);
      })
      .catch(() => {});
  }, []);

  /* ================= SAVE PROGRESS ================= */
  const saveProgress = async () => {
    try {
      const res = await axios.post("/api/motor/save-progress", {
        vehicleType,
        fuelType,
        vehicleAge,
        usage,
        ownership,
        claims,
        ncb,
        garage,
        antiTheft,
        plan,
        addons,
        idv,
        premium,
      });

      if (res.data?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save progress");
    }
  };

  const toggleAddon = (val) => {
    setAddons((prev) =>
      prev.includes(val)
        ? prev.filter((v) => v !== val)
        : [...prev, val]
    );
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12">

      {/* ================= HEADER ================= */}
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
              Protect Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Ride
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Answer a few questions and we’ll find the best motor insurance for you.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={saveProgress}
              className="px-4 py-2 rounded-xl bg-white shadow text-sm font-semibold hover:bg-indigo-50"
            >
              Save Progress
            </button>

            {/* ✅ SAME UX AS HEALTH & LIFE */}
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
        subtitle="Basic information about your vehicle"
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
          <Input
            label="📅 Year of Manufacture"
            value={year}
            onChange={setYear}
          />
          <Select
            label="⛽ Fuel Type"
            value={fuelType}
            onChange={setFuelType}
            options={["Petrol", "Diesel", "CNG", "Electric"]}
          />
        </div>

        <p className="text-xs mt-3 text-gray-500">
          Vehicle Age: <strong>{vehicleAge} years</strong>
        </p>
      </Section>

      {/* ================= USAGE & RISK ================= */}
      <Section
        title="Usage & Risk Profile"
        subtitle="How and where you use your vehicle"
        color="purple"
        icon={<Gauge />}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-purple-500">
            DAILY USAGE
          </p>
          <span className="bg-purple-500 text-white px-3 py-1 rounded-full">
            {usage} km/day
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="100"
          value={usage}
          onChange={(e) => setUsage(Number(e.target.value))}
          className="w-full mt-4 accent-purple-500"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          <Toggle label="Ownership" options={["Owned", "Loan"]} value={ownership} onChange={setOwnership} />
          <Toggle label="Claims Last Year" options={["No", "Yes"]} value={claims} onChange={setClaims} />
          <Toggle label="Garage Parking" options={["Yes", "No"]} value={garage} onChange={setGarage} />
          <Toggle label="Anti-theft Device" options={["Yes", "No"]} value={antiTheft} onChange={setAntiTheft} />
        </div>

        <p className="text-xs font-semibold text-purple-500 mt-6">
          EXISTING NO-CLAIM BONUS (NCB)
        </p>

        <div className="grid grid-cols-5 gap-3 mt-3">
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
        subtitle="Coverage type & add-ons"
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
          {["Zero Depreciation", "Engine Protection", "Roadside Assistance", "Consumables Cover"].map((a) => (
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

      {/* ================= PREMIUM ================= */}
      <Section
        title="Budget & Financials"
        subtitle="Choose a comfortable annual premium"
        color="green"
        icon={<Wallet />}
      >
        <div>
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-green-600">
              TARGET ANNUAL PREMIUM
            </p>
            {/* ✅ AMOUNT SHOWN CLEARLY */}
            <span className="bg-green-500 text-white px-3 py-1 rounded-full">
              ₹{premium}
            </span>
          </div>

          <input
            type="range"
            min="3000"
            max="50000"
            step="500"
            value={premium}
            onChange={(e) => setPremium(Number(e.target.value))}
            className="w-full accent-green-500 mt-3"
          />
        </div>
      </Section>

      {/* ================= CTA ================= */}
      <button
        onClick={() =>
          navigate("/motorrecresults", {
            state: {
              vehicleType,
              fuelType,
              vehicleAge,
              usage,
              ownership,
              claims,
              ncb,
              garage,
              antiTheft,
              plan,
              addons,
              idv,
              premium,
            },
          })
        }
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold
        bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95"
      >
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
    green: "bg-green-50 border-green-200 before:bg-green-500",
  };

  return (
    <div className={`relative border rounded-3xl p-8 ${colors[color]}
      before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-3xl`}>
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

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 rounded-2xl border px-4 py-3"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 rounded-2xl border px-4 py-3 bg-white"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
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
              value === o ? "bg-purple-500 text-white" : "hover:bg-gray-50"
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
      className={`cursor-pointer rounded-2xl p-6 text-center border relative transition
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

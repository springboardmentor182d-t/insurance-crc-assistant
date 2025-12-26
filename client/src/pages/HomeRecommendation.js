import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Building2,
  Key,
  Landmark,
  ShieldCheck,
  Check,
  Wallet,
} from "lucide-react";

export default function HomeRecommendation() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  /* ================= STATE ================= */
  const [propertyType, setPropertyType] = useState("Apartment");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");

  const [ownership, setOwnership] = useState("Owned");
  const [occupancy, setOccupancy] = useState("Self Occupied");
  const [construction, setConstruction] = useState("Concrete");
  const [riskZone, setRiskZone] = useState("Low");
  const [previousClaims, setPreviousClaims] = useState("No");

  const [coverage, setCoverage] = useState("Structure");
  const [sumInsured, setSumInsured] = useState("");

  // ✅ REQUIRED BY BACKEND (THIS WAS MISSING)
  const [security, setSecurity] = useState("Fire Alarm");

  const [premium, setPremium] = useState(12000);

  /* ================= LOAD SAVED PROGRESS ================= */
  useEffect(() => {
    axios.get("/api/property/load-progress").then((res) => {
      if (!res.data?.data) return;
      const d = res.data.data;

      setPropertyType(d.propertyType);
      setAge(d.age?.toString());
      setArea(d.area?.toString());
      setCity(d.city);

      setOwnership(d.ownership);
      setOccupancy(d.occupancy);
      setConstruction(d.construction);
      setRiskZone(d.riskZone);
      setPreviousClaims(d.previousClaims);

      setCoverage(d.coverage);
      setSumInsured(d.sumInsured?.toString());
      setSecurity(d.security); // ✅ LOAD
      setPremium(d.premium);
    });
  }, []);

  /* ================= SAVE PROGRESS ================= */
  const saveProgress = async () => {
    try {
      const res = await axios.post("/api/property/save-progress", {
        propertyType,
        age: Number(age),
        area: Number(area),
        city,
        ownership,
        occupancy,
        construction,
        riskZone,
        previousClaims,
        coverage,
        sumInsured: Number(sumInsured),
        security, // ✅ REQUIRED
        premium,
      });

      if (res.data?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch {
      alert("Failed to save progress");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-14">

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
                Dream Home
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Answer a few questions and we’ll recommend the best home insurance for you.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={saveProgress}
              className="px-4 py-2 rounded-xl bg-white shadow text-sm font-semibold hover:bg-indigo-50"
            >
              Save Progress
            </button>

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

      {/* ================= PROPERTY DETAILS ================= */}
      <Section
        title="Property Details"
        subtitle="Basic information about your home"
        color="red"
        icon={<Home />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Apartment", icon: Building2 },
            { label: "Independent House", icon: Home },
            { label: "Rented Home", icon: Key },
            { label: "Owned Home", icon: Landmark },
          ].map(({ label, icon: Icon }) => (
            <Selectable
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
          <Input label="Property Age (Years)" value={age} onChange={setAge} />
          <Input label="Built-up Area (sq ft)" value={area} onChange={setArea} />
          <Input label="City / ZIP" value={city} onChange={setCity} />
        </div>
      </Section>

      {/* ================= RISK ================= */}
      <Section
        title="Ownership & Risk Profile"
        subtitle="Helps calculate accurate premium"
        color="orange"
        icon={<ShieldCheck />}
      >
        <Toggle label="Ownership" value={ownership} options={["Owned", "Rented"]} onChange={setOwnership} />
        <Toggle label="Occupancy" value={occupancy} options={["Self Occupied", "Tenant", "Vacant"]} onChange={setOccupancy} />
        <Toggle label="Construction Type" value={construction} options={["Concrete", "Mixed", "Wooden"]} onChange={setConstruction} />
        <Toggle label="Risk Zone" value={riskZone} options={["Low", "Medium", "High"]} onChange={setRiskZone} />
        <Toggle label="Previous Claims" value={previousClaims} options={["No", "Yes"]} onChange={setPreviousClaims} />
      </Section>

      {/* ================= COVERAGE ================= */}
      <Section
        title="Coverage Needs"
        subtitle="What do you want to protect?"
        color="orange"
        icon={<ShieldCheck />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {["Structure", "Contents", "Valuables", "Electronics", "Loss of Rent"].map((c) => (
            <Selectable
              key={c}
              label={c}
              icon={<Home size={18} />}
              active={coverage === c}
              onClick={() => setCoverage(c)}
              color="orange"
            />
          ))}
        </div>

        <Input label="Preferred Sum Insured" prefix="₹" value={sumInsured} onChange={setSumInsured} />
      </Section>

      {/* ================= PREMIUM ================= */}
      <Section
        title="Budget & Premium"
        subtitle="Choose a comfortable annual premium"
        color="green"
        icon={<Wallet />}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-green-600">
            TARGET ANNUAL PREMIUM
          </p>
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
          className="w-full mt-4 accent-green-500"
        />
      </Section>

      {/* ================= CTA ================= */}
      <button
        onClick={() =>
          navigate("/homerecresults", {
            state: {
              propertyType,
              age: Number(age),
              area: Number(area),
              city,
              ownership,
              occupancy,
              construction,
              riskZone,
              previousClaims,
              coverage,
              sumInsured: Number(sumInsured),
              security, // ✅ PASSED
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
    red: "bg-red-50 border-red-200 before:bg-red-500",
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
      <div className="space-y-6">{children}</div>
    </div>
  );
}

const Input = ({ label, prefix, value, onChange }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <div className="flex items-center border rounded-2xl px-4 py-3 mt-1 bg-white">
      {prefix && <span className="mr-2 font-semibold">{prefix}</span>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full outline-none"
      />
    </div>
  </div>
);

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
              value === o ? "bg-orange-500 text-white" : "hover:bg-gray-50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Selectable({ label, icon, active, onClick, color }) {
  const colors = {
    red: "border-red-500 bg-red-50",
    orange: "border-orange-500 bg-orange-50",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 text-center border transition
      ${active ? colors[color] : "bg-white hover:bg-gray-50"}`}
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
}

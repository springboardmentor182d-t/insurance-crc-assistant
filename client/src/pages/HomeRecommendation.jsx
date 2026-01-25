import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Flame,
  Camera,
  Building2,
  IndianRupee,
} from "lucide-react";

export default function HomeRecommendation() {
  const navigate = useNavigate();

  /* ================= PROPERTY ================= */
  const [propertyType, setPropertyType] = useState("apartment");
  const [ownershipType, setOwnershipType] = useState("owned");
  const [propertyAge, setPropertyAge] = useState(5);
  const [builtupArea, setBuiltupArea] = useState(2450);

  /* ================= COVERAGE ================= */
  const [needStructure, setNeedStructure] = useState(true);
  const [needContents, setNeedContents] = useState(true);
  const [needValuables, setNeedValuables] = useState(false);
  const [needElectronics, setNeedElectronics] = useState(false);
  const [needRentLoss, setNeedRentLoss] = useState(false);

  /* ================= SUM INSURED ================= */
  const [sumInsured, setSumInsured] = useState(500000);

  /* ================= SECURITY ================= */
  const [security, setSecurity] = useState({
    security24x7: false,
    fireAlarm: false,
    cctv: false,
  });

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/homerecresults", {
      state: {
        property_type: propertyType,
        ownership_type: ownershipType,
        property_age: propertyAge,
        builtup_area: builtupArea,

        need_structure: needStructure,
        need_contents: needContents,
        need_valuables: needValuables,
        need_electronics: needElectronics,
        need_rent_loss: needRentLoss,

        preferred_sum_insured: sumInsured,

        has_security:
          security.security24x7 ||
          security.fireAlarm ||
          security.cctv,
      },
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-10
                    bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* HEADER */}
      <button
        onClick={() => navigate("/recommendations")}
        className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div>
        <h1 className="text-2xl font-bold">
          Get Your{" "}
          <span className="text-[var(--accent)]">
            Home Insurance
          </span>{" "}
          Recommendations
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Customize coverage for your property, valuables & security.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PROPERTY DETAILS */}
        <Card title="Property Details" icon={<Building2 size={18} />}>
          <div className="flex gap-3 flex-wrap">
            {[
              ["Apartment", "apartment"],
              ["Villa / House", "villa_house"],
              ["Penthouse", "penthouse"],
            ].map(([label, value]) => (
              <Pill
                key={value}
                active={propertyType === value}
                onClick={() => setPropertyType(value)}
              >
                {label}
              </Pill>
            ))}
          </div>

          <div className="flex gap-3">
            <Pill
              active={ownershipType === "owned"}
              onClick={() => setOwnershipType("owned")}
            >
              Owned
            </Pill>
            <Pill
              active={ownershipType === "rented"}
              onClick={() => setOwnershipType("rented")}
            >
              Rented
            </Pill>
          </div>

          <NumberInput
            label="Property Age (Years)"
            value={propertyAge}
            onChange={setPropertyAge}
          />

          <NumberInput
            label="Built-up Area (sq ft)"
            value={builtupArea}
            onChange={setBuiltupArea}
          />
        </Card>

        {/* COVERAGE */}
        <Card title="Coverage Required" icon={<ShieldCheck size={18} />}>
          <Toggle label="Structure" value={needStructure} setValue={setNeedStructure} />
          <Toggle label="Contents" value={needContents} setValue={setNeedContents} />
          <Toggle label="Valuables" value={needValuables} setValue={setNeedValuables} />
          <Toggle label="Electronics" value={needElectronics} setValue={setNeedElectronics} />
          <Toggle label="Rent Loss Protection" value={needRentLoss} setValue={setNeedRentLoss} />
        </Card>

        {/* SUM INSURED */}
        <Card title="Preferred Sum Insured" icon={<IndianRupee size={18} />} full>
          <p className="text-2xl font-bold text-[var(--accent)]">
            ₹ {sumInsured.toLocaleString("en-IN")}
          </p>

          <input
            type="range"
            min={100000}
            max={2000000}
            step={50000}
            value={sumInsured}
            onChange={(e) => setSumInsured(+e.target.value)}
            className="w-full accent-indigo-600"
          />
        </Card>

        {/* SECURITY */}
        <Card title="Security Features" icon={<Lock size={18} />} full>
          <div className="flex gap-3 flex-wrap">
            <Chip
              label="24/7 Security"
              icon={Lock}
              active={security.security24x7}
              onClick={() =>
                setSecurity(s => ({ ...s, security24x7: !s.security24x7 }))
              }
            />
            <Chip
              label="Fire Alarm"
              icon={Flame}
              active={security.fireAlarm}
              onClick={() =>
                setSecurity(s => ({ ...s, fireAlarm: !s.fireAlarm }))
              }
            />
            <Chip
              label="CCTV"
              icon={Camera}
              active={security.cctv}
              onClick={() =>
                setSecurity(s => ({ ...s, cctv: !s.cctv }))
              }
            />
          </div>
        </Card>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   shadow-lg hover:scale-[1.03] transition"
      >
        ⚡ GET PERSONALIZED HOME RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Card({ title, icon, children, full }) {
  return (
    <div className={`bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border)] space-y-5
      ${full ? "lg:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-[var(--accent)]">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold
        ${active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]"}
      `}
    >
      {children}
    </button>
  );
}

function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)]
                   border border-[var(--border)]"
      />
    </div>
  );
}

function Toggle({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center bg-[var(--bg-main)]
                    rounded-xl px-4 py-3 border border-[var(--border)]">
      <span className="text-sm">{label}</span>
      <div className="flex gap-2">
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 text-xs rounded-full
            ${value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : "border border-[var(--border)]"}`}
        >
          Yes
        </button>
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 text-xs rounded-full
            ${!value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : "border border-[var(--border)]"}`}
        >
          No
        </button>
      </div>
    </div>
  );
}

function Chip({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border
        ${active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]"}
      `}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

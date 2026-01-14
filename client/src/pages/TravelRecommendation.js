import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  User,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export default function TravelRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [saved, setSaved] = useState(false);

  const [tripType, setTripType] = useState("Single Trip");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [travellers, setTravellers] = useState([
    { name: "", age: "", gender: "Male" },
  ]);

  const [coverage, setCoverage] = useState("Medical Coverage");
  const [planType, setPlanType] = useState("Basic");
  const [tenure, setTenure] = useState("");

  const [medicalSumInsured, setMedicalSumInsured] = useState("500000");
  const [preExisting, setPreExisting] = useState("No");
  const [adventureCover, setAdventureCover] = useState("No");

  const [premium, setPremium] = useState(8000);

  /* ================= LOAD SAVED (LOCAL) ================= */
  useEffect(() => {
    const savedData = localStorage.getItem("travel_progress");
    if (!savedData) return;

    const d = JSON.parse(savedData);
    setTripType(d.tripType);
    setDestination(d.destination);
    setStartDate(d.startDate);
    setEndDate(d.endDate);
    setTravellers(d.travellers);
    setCoverage(d.coverage);
    setPlanType(d.planType);
    setTenure(d.tenure);
    setMedicalSumInsured(d.medicalSumInsured);
    setPreExisting(d.preExisting);
    setAdventureCover(d.adventureCover);
    setPremium(d.premium);
  }, []);

  /* ================= SAVE ================= */
  const saveProgress = () => {
    localStorage.setItem(
      "travel_progress",
      JSON.stringify({
        tripType,
        destination,
        startDate,
        endDate,
        travellers,
        coverage,
        planType,
        tenure,
        medicalSumInsured,
        preExisting,
        adventureCover,
        premium,
      })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addTraveller = () => {
    setTravellers([...travellers, { name: "", age: "", gender: "Male" }]);
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
              Secure Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Journey Today
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Tell us about your travel plans to get the perfect travel insurance policy.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={saveProgress}
              className="px-4 py-2 rounded-xl bg-white shadow text-sm font-semibold hover:bg-indigo-50"
            >
              Save Progress
            </button>
            {saved && (
              <p className="text-xs text-green-600 mt-1">✓ Progress saved</p>
            )}
          </div>
        </div>
      </div>

      {/* ================= TRIP DETAILS ================= */}
      <Section title="Trip Details" subtitle="Tell us about your journey" color="red" icon={<Plane />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {["Single Trip", "Multi-Trip", "Student"].map((t) => (
            <SelectableCard key={t} label={t} active={tripType === t} onClick={() => setTripType(t)} color="red" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input label="Destination Country" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </Section>

      {/* ================= TRAVELERS ================= */}
      <Section title="Traveler Details" subtitle="Who is travelling?" color="blue" icon={<User />}>
        {travellers.map((t, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input label="Full Name" value={t.name} onChange={(e) => {
              const copy = [...travellers];
              copy[i].name = e.target.value;
              setTravellers(copy);
            }} />
            <Input label="Age" type="number" value={t.age} onChange={(e) => {
              const copy = [...travellers];
              copy[i].age = e.target.value;
              setTravellers(copy);
            }} />
            <Select
              label="Gender"
              value={t.gender}
              onChange={(val) => {
                const copy = [...travellers];
                copy[i].gender = val;
                setTravellers(copy);
              }}
              options={["Male", "Female", "Other"]}
            />
          </div>
        ))}
        <button onClick={addTraveller} className="text-sm font-semibold text-indigo-600">
          + Add Another Traveler
        </button>
      </Section>

      {/* ================= COVERAGE ================= */}
      <Section title="Coverage Needs" subtitle="Choose your protection" color="orange" icon={<ShieldCheck />}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Medical Coverage", "Baggage Protection", "Trip Cancellation", "Accidental Cover"].map((c) => (
            <SelectableCard key={c} label={c} active={coverage === c} onClick={() => setCoverage(c)} color="orange" />
          ))}
        </div>

        <Input label="Medical Sum Insured (₹)" value={medicalSumInsured} onChange={(e) => setMedicalSumInsured(e.target.value)} />
        <Select label="Pre-existing Disease Cover" value={preExisting} onChange={setPreExisting} options={["No", "Yes"]} />
        <Select label="Adventure Sports Cover" value={adventureCover} onChange={setAdventureCover} options={["No", "Yes"]} />
      </Section>

      {/* ================= PREMIUM (LIKE HEALTH/LIFE) ================= */}
      <Section title="Budget & Premium" subtitle="Choose your budget" color="green" icon={<Wallet />}>
        <div className="flex justify-between">
          <p className="text-xs font-semibold text-green-600">TARGET PREMIUM</p>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full">
            ₹{premium}
          </span>
        </div>

        <input
          type="range"
          min="2000"
          max="50000"
          step="500"
          value={premium}
          onChange={(e) => setPremium(Number(e.target.value))}
          className="w-full mt-4 accent-green-500"
        />
      </Section>

      {/* ================= CTA ================= */}
      <button
        onClick={() => navigate("/travelrecresults", {
          state: {
            tripType,
            destination,
            startDate,
            endDate,
            travellers,
            coverage,
            planType,
            tenure,
            medicalSumInsured,
            preExisting,
            adventureCover,
            premium,
          },
        })}
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold
        bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-95"
      >
        Get Personalized Recommendations
      </button>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, subtitle, icon, color, children }) {
  const colors = {
    red: "bg-red-50 border-red-200 before:bg-red-500",
    blue: "bg-blue-50 border-blue-200 before:bg-blue-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
    green: "bg-green-50 border-green-200 before:bg-green-500",
  };

  return (
    <div className={`relative border rounded-3xl p-8 ${colors[color]}
      before:absolute before:left-0 before:top-0 before:h-full before:w-1.5`}>
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

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs font-semibold">{label}</label>
    <input className="w-full border rounded-2xl px-4 py-3 mt-1 bg-white" {...props} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-xs font-semibold">{label}</label>
    <select
      className="w-full border rounded-2xl px-4 py-3 mt-1 bg-white"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const SelectableCard = ({ label, active, onClick, color }) => {
  const colors = {
    red: "border-red-500 bg-red-50",
    orange: "border-orange-500 bg-orange-50",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 text-center border
      ${active ? colors[color] : "bg-white hover:bg-gray-50"}`}
    >
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
};

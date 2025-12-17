import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  User,
  ShieldCheck,
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

  /* ================= HANDLERS ================= */
  const addTraveller = () => {
    setTravellers([...travellers, { name: "", age: "", gender: "Male" }]);
  };

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
              Secure Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Journey Today
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Tell us about your travel plans to get the perfect travel insurance
              policy.
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

            {/* Message BELOW button without shifting layout */}
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

      {/* ================= TRIP DETAILS ================= */}
      <Section
        title="Trip Details"
        subtitle="Tell us about your journey"
        color="red"
        icon={<Plane />}
      >
        <p className="text-xs font-semibold text-red-500">TRIP TYPE</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {["Single Trip", "Multi-Trip", "Student"].map((t) => (
            <SelectableCard
              key={t}
              label={t}
              active={tripType === t}
              onClick={() => setTripType(t)}
              color="red"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input
            label="Destination Country"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Thailand"
          />
          <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </Section>

      {/* ================= TRAVELER DETAILS ================= */}
      <Section
        title="Traveler Details"
        subtitle="Who is travelling?"
        color="blue"
        icon={<User />}
      >
        {travellers.map((t, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input label="Full Name" />
            <Input label="Age" type="number" />
            <Select
              label="Gender"
              options={["Male", "Female", "Other"]}
            />
          </div>
        ))}

        <button
          onClick={addTraveller}
          className="mt-2 text-sm font-semibold text-indigo-600 hover:underline"
        >
          + Add Another Traveler
        </button>
      </Section>

      {/* ================= COVERAGE NEEDS ================= */}
      <Section
        title="Coverage Needs"
        subtitle="Choose your protection"
        color="orange"
        icon={<ShieldCheck />}
      >
        <p className="text-xs font-semibold text-orange-500">
          MAIN COVERAGE
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
          {[
            "Medical Coverage",
            "Baggage Protection",
            "Trip Cancellation",
            "Accidental Cover",
          ].map((c) => (
            <SelectableCard
              key={c}
              label={c}
              active={coverage === c}
              onClick={() => setCoverage(c)}
              color="orange"
            />
          ))}
        </div>

        <p className="text-xs font-semibold text-orange-500 mt-6">
          PLAN TYPE
        </p>

        <div className="flex gap-3 mt-2">
          {["Basic", "Enhanced", "Premium"].map((p) => (
            <SelectableCard
              key={p}
              label={p}
              active={planType === p}
              onClick={() => setPlanType(p)}
              color="orange"
            />
          ))}
        </div>

        <Input
          label="Travel Duration"
          placeholder="Select duration"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
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
    blue: "bg-blue-50 border-blue-200 before:bg-blue-500",
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

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <input
      className="w-full border rounded-2xl px-4 py-3 mt-1 bg-white"
      {...props}
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <select className="w-full border rounded-2xl px-4 py-3 mt-1 bg-white">
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
      className={`cursor-pointer rounded-2xl p-4 text-center border transition
        hover:shadow-md hover:-translate-y-1
        ${active ? colors[color] : "bg-white"}`}
    >
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
};

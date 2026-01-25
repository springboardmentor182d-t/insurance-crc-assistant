import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Plane,
  Calendar,
  Users,
  HeartPulse,
  Shield,
  Mountain,
  Luggage,
} from "lucide-react";

export default function TravelRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [tripType, setTripType] = useState("single");
  const [destinationType, setDestinationType] = useState("domestic");

  const [tripDays, setTripDays] = useState(14);
  const [travelers, setTravelers] = useState(2);

  const [age, setAge] = useState(40);
  const [preExisting, setPreExisting] = useState(false);

  const [medical, setMedical] = useState(true);
  const [tripCancel, setTripCancel] = useState(true);
  const [baggage, setBaggage] = useState(true);
  const [adventure, setAdventure] = useState(false);

  const [coverageAmount, setCoverageAmount] = useState("medium");

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/travelrecresults", {
      state: {
        trip_type: tripType,
        destination_type: destinationType,
        trip_duration_days: tripDays,
        number_of_travelers: travelers,
        oldest_traveler_age: age,
        pre_existing_condition: preExisting,
        medical_cover_required: medical,
        trip_cancellation_required: tripCancel,
        baggage_cover_required: baggage,
        adventure_sports: adventure,
        coverage_amount_preference: coverageAmount,
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
            Travel Insurance
          </span>{" "}
          Recommendations
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Tell us about your trip to find the best travel coverage.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* TRIP DETAILS */}
        <Card title="Trip Details" icon={<Plane size={18} />}>
          <PillGroup
            label="Trip Type"
            value={tripType}
            setValue={setTripType}
            options={["single", "multi", "student"]}
          />

          <PillGroup
            label="Destination"
            value={destinationType}
            setValue={setDestinationType}
            options={[
              "domestic",
              "international",
              "schengen",
              "usa_canada",
            ]}
          />

          <NumberInput
            label="Trip Duration (Days)"
            value={tripDays}
            onChange={setTripDays}
          />

          <NumberInput
            label="Number of Travelers"
            value={travelers}
            onChange={setTravelers}
          />
        </Card>

        {/* TRAVELER PROFILE */}
        <Card title="Traveler Profile" icon={<HeartPulse size={18} />}>
          <NumberInput
            label="Age of Oldest Traveler"
            value={age}
            onChange={setAge}
          />

          <Toggle
            label="Pre-existing Condition?"
            value={preExisting}
            setValue={setPreExisting}
          />
        </Card>

        {/* COVERAGE */}
        <Card title="Coverage Preferences" icon={<Shield size={18} />} full>
          <Toggle
            label="Medical Coverage"
            value={medical}
            setValue={setMedical}
          />
          <Toggle
            label="Trip Cancellation"
            value={tripCancel}
            setValue={setTripCancel}
          />
          <Toggle
            label="Baggage Protection"
            value={baggage}
            setValue={setBaggage}
          />
          <Toggle
            label="Adventure Sports"
            value={adventure}
            setValue={setAdventure}
          />
        </Card>

        {/* COVERAGE AMOUNT */}
        <Card title="Coverage Amount" icon={<Luggage size={18} />} full>
          <PillRow
            value={coverageAmount}
            setValue={setCoverageAmount}
            options={["low", "medium", "high"]}
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
        ⚡ GET PERSONALIZED TRAVEL RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= UI HELPERS (SAME AS MOTOR) ================= */

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

function PillRow({ value, setValue, options }) {
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
          {o.replace("_", " ").toUpperCase()}
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

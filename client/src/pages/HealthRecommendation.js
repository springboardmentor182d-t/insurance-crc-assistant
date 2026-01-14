import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  User,
  Heart,
  PersonStanding,
  HeartPulse,
  ShieldCheck,
  Wallet,
  Plus,
  Minus,
  Check,
} from "lucide-react";

export default function HealthRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [policy, setPolicy] = useState("Individual");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [goal, setGoal] = useState("Comprehensive");
  const [premium, setPremium] = useState(25000);

  // 🔥 NEW SIGNALS
  const [ageGroup, setAgeGroup] = useState("30-45");
  const [cityTier, setCityTier] = useState("Tier 1");
  const [roomPreference, setRoomPreference] = useState("Single Private");
  const [waitingTolerance, setWaitingTolerance] = useState("Medium");
  const [hospitalPreference, setHospitalPreference] = useState("Any Network");

  const toggle = (val, list, setList) => {
    setList(
      list.includes(val)
        ? list.filter((v) => v !== val)
        : [...list, val]
    );
  };

  /* ================= LOAD SAVED PROGRESS ================= */
  useEffect(() => {
    axios.get("/api/health/load-progress").then((res) => {
      if (res.data?.data) {
        const d = res.data.data;
        setPolicy(d.policy);
        setAdults(d.adults);
        setChildren(d.children);
        setMedicalHistory(d.medicalHistory);
        setGoal(d.goal);
        setPremium(d.premium);
      }
    });
  }, []);

  /* ================= SAVE PROGRESS ================= */
  const saveProgress = async () => {
    try {
      setSaving(true);
      setSaved(false);

      const res = await axios.post("/api/health/save-progress", {
        policy,
        adults,
        children,
        medicalHistory,
        goal,
        premium,
        ageGroup,
        cityTier,
        roomPreference,
        waitingTolerance,
        hospitalPreference,
      });

      if (res.data?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12">
      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate("/recommendations")}
          className="inline-flex items-center gap-1 px-3 py-1.5 mb-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
        >
          ← Back
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">
              Craft Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Answer a few questions and we’ll curate health insurance plans
              tailored to you.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={saveProgress}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-white shadow text-sm font-semibold hover:bg-indigo-50 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Progress"}
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

      {/* COVERAGE BASICS */}
      <Section
        color="red"
        title="Coverage Basics"
        subtitle="Who are we protecting?"
        icon={<Users />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[
            { label: "Individual", icon: User },
            { label: "Couple", icon: Heart },
            { label: "Family", icon: Users },
            { label: "Parents / Senior", icon: PersonStanding },
          ].map((p) => {
            const Icon = p.icon;
            const active = policy === p.label;

            return (
              <div
                key={p.label}
                onClick={() => setPolicy(p.label)}
                className={`relative cursor-pointer rounded-2xl p-6 text-center border transition ${
                  active
                    ? "border-red-500 bg-red-50 shadow"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {active && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    <Check size={12} />
                  </span>
                )}
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <p className="text-sm font-semibold">{p.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Counter label="Adults" value={adults} setValue={setAdults} />
          <Counter label="Children" value={children} setValue={setChildren} />
        </div>
      </Section>

      {/* HEALTH & LIFESTYLE */}
      <Section
        color="purple"
        title="Health & Lifestyle"
        subtitle="Understanding your health profile"
        icon={<HeartPulse />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-3">
          {["None", "Diabetes", "BP / HTN", "Asthma", "Heart", "Thyroid"].map(
            (m) => (
              <div
                key={m}
                onClick={() =>
                  toggle(m, medicalHistory, setMedicalHistory)
                }
                className={`cursor-pointer rounded-2xl p-4 text-center border transition ${
                  medicalHistory.includes(m)
                    ? "bg-purple-500 text-white"
                    : "bg-white hover:bg-purple-50"
                }`}
              >
                <p className="text-sm font-semibold">{m}</p>
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Select
            label="🧓 Age Group"
            value={ageGroup}
            setValue={setAgeGroup}
            options={["18-30", "30-45", "45-60", "60+"]}
          />
          <Select
            label="🏙 City Tier"
            value={cityTier}
            setValue={setCityTier}
            options={["Tier 1", "Tier 2", "Tier 3"]}
          />
        </div>
      </Section>

      {/* PLAN PREFERENCES */}
      <Section
        color="orange"
        title="Plan Preferences"
        subtitle="Customize what matters most"
        icon={<ShieldCheck />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          {["Comprehensive", "Lowest Premium", "Tax Saving"].map((g) => (
            <div
              key={g}
              onClick={() => setGoal(g)}
              className={`cursor-pointer rounded-2xl p-4 border transition ${
                goal === g
                  ? "bg-orange-50 border-orange-500"
                  : "bg-white hover:bg-orange-50"
              }`}
            >
              <p className="font-semibold">{g}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Select
            label="🛏 Room Preference"
            value={roomPreference}
            setValue={setRoomPreference}
            options={["Shared", "Single Private", "No Limit"]}
          />
          <Select
            label="⏳ Waiting Period"
            value={waitingTolerance}
            setValue={setWaitingTolerance}
            options={["Low", "Medium", "High"]}
          />
          <Select
            label="🏥 Hospital Preference"
            value={hospitalPreference}
            setValue={setHospitalPreference}
            options={["Any Network", "Top Private", "Cashless Only"]}
          />
        </div>
      </Section>

      {/* BUDGET */}
      <Section
        color="green"
        title="Budget & Financials"
        subtitle="Aligning with your comfort"
        icon={<Wallet />}
      >
        <div>
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-green-600">
              TARGET ANNUAL PREMIUM
            </p>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full">
              ₹{premium}
            </span>
          </div>

          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={premium}
            onChange={(e) => setPremium(Number(e.target.value))}
            className="w-full accent-green-500 mt-3"
          />
        </div>
      </Section>

      {/* CTA */}
      <button
        type="button"
        onClick={() =>
          navigate("/healthrecresults", {
            state: {
              policy,
              adults,
              children,
              medicalHistory,
              goal,
              premium,
              ageGroup,
              cityTier,
              roomPreference,
              waitingTolerance,
              hospitalPreference,
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

/* ===== HELPERS ===== */

function Counter({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center bg-white border rounded-2xl p-4">
      <span className="font-semibold">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => setValue(Math.max(0, value - 1))}>
          <Minus />
        </button>
        <span>{value}</span>
        <button onClick={() => setValue(value + 1)}>
          <Plus />
        </button>
      </div>
    </div>
  );
}

function Select({ label, value, setValue, options }) {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">{label}</p>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded-xl px-4 py-2"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Section({ title, subtitle, color, icon, children }) {
  const map = {
    red: "bg-red-50 border-red-200 before:bg-red-500",
    purple: "bg-purple-50 border-purple-200 before:bg-purple-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
    green: "bg-green-50 border-green-200 before:bg-green-500",
  };

  return (
    <div
      className={`relative border rounded-3xl p-8 ${map[color]}
      before:absolute before:left-0 before:top-0 before:h-full
      before:w-1.5 before:rounded-l-3xl`}
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

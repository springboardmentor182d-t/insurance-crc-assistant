import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  Users,
  HeartPulse,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function HealthRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [memberType, setMemberType] = useState("Self");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [parents, setParents] = useState(0);

  const [cover, setCover] = useState(1500000);
  const [premium, setPremium] = useState(2500);

  const [hasPED, setHasPED] = useState(false);
  const [maternity, setMaternity] = useState(false);

  const [room, setRoom] = useState("Private");
  const [deductible, setDeductible] = useState("Low");
  const [copay, setCopay] = useState(false);

  /* ================= AUTO MEMBER ADJUST ================= */
  useEffect(() => {
    if (memberType === "Self") {
      setAdults(1);
      setChildren(0);
      setParents(0);
    }
    if (memberType === "Couple") {
      setAdults(2);
      setChildren(0);
      setParents(0);
    }
    if (memberType === "Family") {
      setAdults(2);
      setChildren(1);
      setParents(0);
    }
    if (memberType === "Parents") {
      setAdults(0);
      setChildren(0);
      setParents(2);
      setMaternity(false);
    }
  }, [memberType]);

  /* ================= STYLES ================= */
  const pill =
    "px-4 py-2 rounded-xl text-xs font-semibold transition-all";
  const active =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow";
  const inactive =
    "border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]";

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/healthrecresults", {
      state: {
        coverage_type:
          memberType === "Self"
            ? "individual"
            : memberType.toLowerCase(),
        adults_count: adults,
        children_count: children,
        parents_count: parents,
        cover_amount: cover,
        has_pre_existing_conditions: hasPED,
        maternity_required: maternity,
        room_preference:
          room === "Suite / Any" ? "suite" : room.toLowerCase(),
        max_monthly_premium: premium,
        deductible_preference: deductible.toLowerCase(),
        co_pay_acceptable: copay,
      },
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-10 bg-[var(--bg-main)] text-[var(--text-main)]">

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
            Health Insurance Recommendations
          </span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Customize your health cover based on family, budget & comfort.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* MEMBERS */}
        <Card title="Coverage & Members" icon={<Users size={18} />}>
          <div className="flex gap-3 flex-wrap">
            {["Self", "Couple", "Family", "Parents"].map((m) => (
              <button
                key={m}
                onClick={() => setMemberType(m)}
                className={`${pill} ${
                  memberType === m ? active : inactive
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <Counter label="Adults" value={adults} setValue={setAdults} />
          <Counter
            label="Children"
            value={children}
            setValue={setChildren}
          />
          <Counter label="Parents" value={parents} setValue={setParents} />
        </Card>

        {/* COVER */}
        <Card title="Cover Amount" icon={<ShieldCheck size={18} />}>
          <p className="text-2xl font-bold text-[var(--accent)]">
            ₹ {cover.toLocaleString("en-IN")}
          </p>
          <input
            type="range"
            min={300000}
            max={5000000}
            step={100000}
            value={cover}
            onChange={(e) => setCover(+e.target.value)}
            className="w-full accent-indigo-600"
          />
        </Card>

        {/* HEALTH */}
        <Card
          title="Health & Preferences"
          icon={<HeartPulse size={18} />}
          full
        >
          <ToggleRow
            label="Pre-existing condition?"
            value={hasPED}
            setValue={setHasPED}
          />
          <ToggleRow
            label="Maternity coverage?"
            value={maternity}
            setValue={setMaternity}
            disabled={memberType === "Parents"}
          />

          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2">
              Room Preference
            </p>
            <div className="flex gap-3 flex-wrap">
              {["Shared", "Private", "Suite / Any"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoom(r)}
                  className={`${pill} ${
                    room === r ? active : inactive
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* BUDGET */}
        <Card
          title="Budget & Cost Comfort"
          icon={<Wallet size={18} />}
          full
        >
          <p className="text-xl font-bold text-[var(--accent)]">
            ₹ {premium.toLocaleString("en-IN")} / month
          </p>
          <input
            type="range"
            min={1500}
            max={15000}
            step={500}
            value={premium}
            onChange={(e) => setPremium(+e.target.value)}
            className="w-full accent-indigo-600"
          />

          <div className="flex flex-wrap gap-10">
            <ToggleButtons
              label="Deductible"
              value={deductible}
              setValue={setDeductible}
              options={["Low", "High"]}
            />
            <ToggleButtons
              label="Co-pay Acceptance"
              value={copay}
              setValue={setCopay}
              options={[false, true]}
            />
          </div>
        </Card>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          shadow-md hover:shadow-lg transition"
      >
        ⚡ GET PERSONALIZED HEALTH RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= HELPERS ================= */

function Card({ title, icon, children, full }) {
  return (
    <div
      className={`bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border)] space-y-5 ${
        full ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-[var(--accent)]">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function Counter({ label, value, setValue }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">{label}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="p-2 rounded-full border border-[var(--border)]"
        >
          <Minus size={14} />
        </button>
        <span className="text-lg font-bold">{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="p-2 rounded-full border border-[var(--border)]"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ label, value, setValue, disabled }) {
  const pill =
    "px-4 py-1 rounded-full text-xs font-semibold transition";
  const active =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white";
  const inactive =
    "border border-[var(--border)] text-[var(--text-muted)]";

  return (
    <div className="flex items-center justify-between bg-[var(--bg-main)]
      rounded-xl px-4 py-3 border border-[var(--border)]">
      <p className="text-sm">{label}</p>
      <div className="flex gap-2">
        <button
          disabled={disabled}
          onClick={() => setValue(false)}
          className={`${pill} ${!value ? active : inactive}`}
        >
          No
        </button>
        <button
          disabled={disabled}
          onClick={() => setValue(true)}
          className={`${pill} ${value ? active : inactive}`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

function ToggleButtons({ label, value, setValue, options }) {
  const pill =
    "px-4 py-2 rounded-xl text-xs font-semibold transition-all";
  const active =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow";
  const inactive =
    "border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]";

  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <div className="flex gap-3">
        {options.map((o) => (
          <button
            key={String(o)}
            onClick={() => setValue(o)}
            className={`${pill} ${value === o ? active : inactive}`}
          >
            {typeof o === "boolean" ? (o ? "Yes" : "No") : o}
          </button>
        ))}
      </div>
    </div>
  );
}

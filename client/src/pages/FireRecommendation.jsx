import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Building,
  Flame,
  ShieldAlert,
} from "lucide-react";

export default function FireRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [propertyType, setPropertyType] = useState("residential");
  const [occupancyType, setOccupancyType] = useState("Residential");
  const [constructionType, setConstructionType] = useState("rcc");
  const [propertyAge, setPropertyAge] = useState(10);

  const [coverage, setCoverage] = useState({
    fire: true,
    explosion: true,
    lightning: true,
    natural: true,
    burglary: true,
    electronics: true,
  });

  const [stockValue, setStockValue] = useState(4500000);
  const [machineryValue, setMachineryValue] = useState(2500000);

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/firerecresults", {
      state: {
        property_type: propertyType,
        occupancy_type: occupancyType.toLowerCase(),
        construction_type: constructionType,
        property_age: propertyAge,
        ...coverage,
        stock_value: stockValue,
        machinery_value: machineryValue,
        total_sum_insured: stockValue + machineryValue,
      },
    });
  };

  /* ================= STYLES ================= */
  const pill =
    "px-4 py-2 rounded-xl text-xs font-semibold transition-all";
  const active =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow";
  const inactive =
    "border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-main)]";

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 max-w-7xl mx-auto space-y-10 bg-[var(--bg-main)] text-[var(--text-main)]">

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
            Fire Insurance Recommendations
          </span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1 max-w-3xl">
          Analyze fire-related risks and asset exposure to find the most suitable protection.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PROPERTY DETAILS */}
        <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border)] space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <Building size={18} className="text-[var(--accent)]" />
            Property Details
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)]">
              Property Type
            </label>
            <div className="flex gap-3 mt-2">
              {["residential", "commercial", "industrial"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPropertyType(p)}
                  className={`${pill} ${
                    propertyType === p ? active : inactive
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)]">
              Occupancy Type
            </label>
            <select
              value={occupancyType}
              onChange={(e) => setOccupancyType(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-main)]"
            >
              <option>Residential</option>
              <option>Shop</option>
              <option>Office</option>
              <option>Factory</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)]">
              Property Age (Years)
            </label>
            <input
              type="number"
              value={propertyAge}
              onChange={(e) => setPropertyAge(+e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-main)]"
            />
          </div>
        </div>

        {/* CONSTRUCTION & COVERAGE */}
        <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border)] space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <Flame size={18} className="text-pink-500" />
            Construction & Coverage
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)]">
              Construction Type
            </label>
            <div className="flex gap-3 mt-2">
              {["rcc", "mixed", "wooden"].map((c) => (
                <button
                  key={c}
                  onClick={() => setConstructionType(c)}
                  className={`${pill} ${
                    constructionType === c ? active : inactive
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(coverage).map(([k, v]) => (
              <button
                key={k}
                onClick={() =>
                  setCoverage((c) => ({ ...c, [k]: !c[k] }))
                }
                className={`${pill} ${v ? active : inactive}`}
              >
                {k.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ASSET VALUATION */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border)] space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert size={18} className="text-[var(--accent)]" />
            Asset Valuation
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Slider
              label="Stock / Inventory Value"
              value={stockValue}
              setValue={setStockValue}
              max={10000000}
              accent="accent-indigo-600"
            />
            <Slider
              label="Machinery Value"
              value={machineryValue}
              setValue={setMachineryValue}
              max={5000000}
              accent="accent-pink-500"
            />

            <div className="rounded-2xl p-4 bg-[var(--bg-main)] border border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)]">
                Total Sum Insured
              </p>
              <p className="text-2xl font-bold text-[var(--accent)] mt-2">
                ₹ {(stockValue + machineryValue).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold
        bg-indigo-600 hover:bg-indigo-700 transition"
      >
        🔥 GET PERSONALIZED FIRE RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= COMPONENT ================= */

function Slider({ label, value, setValue, max, accent }) {
  return (
    <div className="rounded-2xl p-4 bg-[var(--bg-main)] border border-[var(--border)] space-y-2">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="text-lg font-bold">
        ₹ {value.toLocaleString("en-IN")}
      </p>
      <input
        type="range"
        min={0}
        max={max}
        step={50000}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className={`w-full ${accent}`}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export default function FirePropertyRecommendation() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  /* ================= STATE ================= */
  const [propertyType, setPropertyType] = useState("Residential");
  const [constructionType, setConstructionType] = useState("RCC");
  const [propertyAge, setPropertyAge] = useState("");
  const [location, setLocation] = useState("");

  const [coverage, setCoverage] = useState([]);
  const [stockValue, setStockValue] = useState("");
  const [machineryValue, setMachineryValue] = useState("");
  const [totalSum, setTotalSum] = useState("");

  /* PREMIUM */
  const [premium, setPremium] = useState(20000);

  /* ================= LOAD SAVED PROGRESS ================= */
  useEffect(() => {
    axios
      .get("/api/fire/load-progress")
      .then((res) => {
        console.log("LOAD RESPONSE:", res.data); // 🔍 ADD THIS

        if (!res.data?.data) return;
        const d = res.data.data;

        setPropertyType(d.propertyType || "Residential");
        setConstructionType(d.constructionType || "RCC");
        setPropertyAge(d.propertyAge ? d.propertyAge.toString() : "");
        setLocation(d.location || "");
        setCoverage(Array.isArray(d.coverage) ? d.coverage : []);
        setStockValue(d.stockValue ? d.stockValue.toString() : "");
        setMachineryValue(d.machineryValue ? d.machineryValue.toString() : "");
        setTotalSum(d.totalSum ? d.totalSum.toString() : "");
        setPremium(d.premium || 20000);
      })
      .catch((err) => {
        console.error("LOAD ERROR:", err);
      });
  }, []);


  /* ================= SAVE PROGRESS ================= */
  const toNumber = (v) => (v !== "" && v !== null ? Number(v) : null);

  const saveProgress = async () => {
    try {
      const payload = {
        propertyType,
        constructionType,
        propertyAge: toNumber(propertyAge),
        location: location?.trim() || null,

        // 🔴 GUARANTEE ARRAY
        coverage: Array.isArray(coverage) ? coverage : [],

        stockValue: toNumber(stockValue),
        machineryValue: toNumber(machineryValue),
        totalSum: toNumber(totalSum),
        premium,
      };

      console.log("SAVE PAYLOAD:", payload); // 🔍 DEBUG

      await axios.post("/api/fire/save-progress", payload);

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err);
      alert("Save failed");
    }
  };

  /* ================= HELPERS ================= */
  const toggleCoverage = (val) => {
    setCoverage((prev) =>
      prev.includes(val)
        ? prev.filter((v) => v !== val)
        : [...prev, val]
    );
  };

  /* ================= RENDER ================= */
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
                Assets & Future
              </span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Get a personalized fire & property insurance plan.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={saveProgress}
              className="px-4 py-2 rounded-xl bg-white shadow
              text-sm font-semibold hover:bg-indigo-50 transition"
            >
              Save Progress
            </button>

            <div className="h-6 mt-1">
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
        subtitle="Basic information"
        color="red"
        icon={<Building2 />}
      >
        <div className="grid grid-cols-3 gap-4 mt-4">
          {["Residential", "Commercial", "Industrial"].map((p) => (
            <SelectableSimple
              key={p}
              label={p}
              active={propertyType === p}
              onClick={() => setPropertyType(p)}
              color="red"
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {["RCC", "Mixed", "Wooden"].map((c) => (
            <SelectableSimple
              key={c}
              label={c}
              active={constructionType === c}
              onClick={() => setConstructionType(c)}
              color="red"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Input
            label="Property Age (Years)"
            value={propertyAge}
            onChange={(e) => setPropertyAge(e.target.value)}
          />
          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </Section>

      {/* ================= COVERAGE ================= */}
      <Section
        title="Coverage Requirements"
        subtitle="Select risks"
        color="orange"
        icon={<ShieldCheck />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {[
            "Fire",
            "Explosion",
            "Lightning",
            "Natural Disasters",
            "Burglary",
            "Machinery Breakdown",
          ].map((c) => (
            <SelectableSimple
              key={c}
              label={c}
              active={coverage.includes(c)}
              onClick={() => toggleCoverage(c)}
              color="orange"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Input label="Stock Value" prefix="₹" value={stockValue}
            onChange={(e) => setStockValue(e.target.value)} />
          <Input label="Machinery Value" prefix="₹" value={machineryValue}
            onChange={(e) => setMachineryValue(e.target.value)} />
          <Input label="Total Sum Insured" prefix="₹" value={totalSum}
            onChange={(e) => setTotalSum(e.target.value)} />
        </div>
      </Section>

      {/* ================= PREMIUM ================= */}
      <Section
        title="Budget & Premium"
        subtitle="Choose annual premium"
        color="green"
        icon={<Wallet />}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-green-600">
            TARGET PREMIUM
          </p>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full">
            ₹{premium}
          </span>
        </div>

        <input
          type="range"
          min="5000"
          max="100000"
          step="1000"
          value={premium}
          onChange={(e) => setPremium(Number(e.target.value))}
          className="w-full mt-4 accent-green-500"
        />
      </Section>

      {/* ================= CTA ================= */}
      <button
        onClick={() =>
          navigate("/firerecresults", {
            state: {
              propertyType,
              constructionType,
              coverage,
              totalSum: toNumber(totalSum),
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

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, subtitle, icon, color, children }) {
  const styles = {
    red: "bg-red-50 border-red-200 before:bg-red-500",
    orange: "bg-orange-50 border-orange-200 before:bg-orange-500",
    green: "bg-green-50 border-green-200 before:bg-green-500",
  };

  return (
    <div
      className={`relative border rounded-3xl p-8 ${styles[color]}
      before:absolute before:left-0 before:top-0 before:h-full
      before:w-1.5 before:rounded-l-3xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-white shadow
        flex items-center justify-center">
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

const Input = ({ label, prefix, ...props }) => (
  <div>
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="flex items-center border rounded-2xl
    px-4 py-3 mt-1 bg-white">
      {prefix && <span className="mr-2 font-semibold">{prefix}</span>}
      <input className="w-full outline-none" {...props} />
    </div>
  </div>
);

function SelectableSimple({ label, active, onClick, color }) {
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
}

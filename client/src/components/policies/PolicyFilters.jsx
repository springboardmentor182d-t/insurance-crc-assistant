import { useEffect, useState } from "react";
import {
  Search,
  Heart,
  Shield,
  Car,
  Plane,
  Home,
  SlidersHorizontal,
  X,
  Check,
} from "lucide-react";

import { getInsuranceTypes } from "../../api/insuranceTypesApi";

/* --------------------------------
   ICON MAP (UI ONLY)
---------------------------------- */
const ICON_MAP = {
  Health: Heart,
  Life: Shield,
  Auto: Car,
  Travel: Plane,
  Home: Home,
};

export default function PolicyFilters({
  search,
  setSearch,
  typesSelected = ["All"], // ✅ SAFE DEFAULT
  setTypesSelected,
  maxPremium,
  setMaxPremium,
  clearFilters,
}) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  /* --------------------------------
     FETCH INSURANCE TYPES
  ---------------------------------- */
  useEffect(() => {
    getInsuranceTypes()
      .then((data) => {
        setTypes([{ id: 0, name: "All" }, ...data]);
      })
      .catch(() => {
        setTypes([{ id: 0, name: "All" }]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* --------------------------------
     MULTI-SELECT LOGIC
  ---------------------------------- */
  const toggleType = (name) => {
    if (name === "All") {
      setTypesSelected(["All"]);
      return;
    }

    setTypesSelected((prev = []) => {
      const withoutAll = prev.filter((t) => t !== "All");

      if (withoutAll.includes(name)) {
        return withoutAll.filter((t) => t !== name);
      }

      return [...withoutAll, name];
    });
  };

  const isActive = (name) =>
    Array.isArray(typesSelected) && typesSelected.includes(name);

  /* --------------------------------
     CLEAR ALL
  ---------------------------------- */
  const handleClear = () => {
    setSearch("");
    setTypesSelected(["All"]);
    setMaxPremium(100000);
    clearFilters?.();
  };

  return (
    <div className="w-72 h-fit sticky top-6 bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-blue-600" />
          <h3 className="font-semibold text-lg text-slate-900">
            Filters
          </h3>
        </div>

        <button
          onClick={handleClear}
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          <X size={14} />
          Clear all
        </button>
      </div>

      {/* SEARCH */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-1">
          Search
        </p>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search policies..."
            className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* INSURANCE TYPE */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">
          Insurance Type
        </p>

        {loading ? (
          <p className="text-sm text-slate-400">
            Loading insurance types…
          </p>
        ) : (
          <div className="space-y-2">
            {types.map(({ id, name }) => {
              const Icon = ICON_MAP[name];
              const active = isActive(name);

              return (
                <button
                  key={id}
                  onClick={() => toggleType(name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {/* ICON (not for ALL) */}
                  {name !== "All" && Icon && (
                    <Icon size={16} />
                  )}

                  <span className="flex-1 text-left">
                    {name}
                  </span>

                  {active && <Check size={16} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* PREMIUM RANGE */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-1">
          Premium Range
        </p>

        <div className="flex justify-between text-sm font-medium text-blue-600 mb-2">
          <span>₹0</span>
          <span>₹{maxPremium.toLocaleString()}</span>
        </div>

        <input
          type="range"
          min={0}
          max={100000}
          step={1000}
          value={maxPremium}
          onChange={(e) => setMaxPremium(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>
    </div>
  );
}

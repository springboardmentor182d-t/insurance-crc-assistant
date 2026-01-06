import {
  Search,
  Shield,
  Heart,
  Car,
  Plane,
  Home,
  SlidersHorizontal,
  X
} from "lucide-react";

const TYPES = [
  { key: "All", icon: Shield },
  { key: "Health", icon: Heart },
  { key: "Life", icon: Shield },
  { key: "Auto", icon: Car },
  { key: "Travel", icon: Plane },
  { key: "Home", icon: Home }
];

export default function PolicyFilters({
  search,
  setSearch,
  type,
  setType,
  maxPremium,
  setMaxPremium,
  clearFilters
}) {
  return (
    <div className="w-72 h-fit sticky top-6 bg-white rounded-2xl border border-slate-200 shadow-md p-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-blue-600" />
          <h3 className="font-semibold text-lg text-slate-900">
            Filters
          </h3>
        </div>

        <button
          onClick={clearFilters}
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          <X size={14} />
          Clear
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-1">Search</p>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search policies..."
            className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* INSURANCE TYPE */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-2">
          Insurance Type
        </p>

        <div className="space-y-2">
          {TYPES.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
                ${
                  type === key
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Icon size={16} />
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* PREMIUM RANGE */}
      <div>
        <p className="text-sm text-slate-600 mb-2">
          Premium Range
        </p>

        <p className="text-sm font-medium text-blue-600 mb-1">
          ₹0 – ₹{maxPremium.toLocaleString()}
        </p>

        <input
          type="range"
          min={0}
          max={100000}
          step={1000}
          value={maxPremium}
          onChange={(e) => setMaxPremium(Number(e.target.value))}
          className="w-full accent-blue-600 mt-1"
        />
      </div>
    </div>
  );
}

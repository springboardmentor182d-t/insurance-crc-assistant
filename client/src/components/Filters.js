import {
  LayoutGrid,
  Heart,
  Shield,
  Car,
  Plane,
  Home as HomeIcon,
  Search
} from "lucide-react";

const FILTERS = [
  { label: "All", icon: LayoutGrid },
  { label: "Health", icon: Heart },
  { label: "Life", icon: Shield },
  { label: "Auto", icon: Car },
  { label: "Travel", icon: Plane },
  { label: "Home", icon: HomeIcon }
];

export default function Filters({ active, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-64">
      <h3 className="font-semibold mb-4">Filters</h3>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          className="w-full border rounded-lg pl-9 py-2 text-sm"
          placeholder="Search policies..."
        />
      </div>

      <div className="space-y-2">
        {FILTERS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              ${
                active === label
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }
            `}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

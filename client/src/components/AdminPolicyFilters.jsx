// client/src/admin/components/AdminPolicyFilters.jsx
import {
  FaHeartbeat,
  FaCar,
  FaPlane,
  FaHome,
  FaBriefcase,
  FaFire,
  FaUsers,
} from "react-icons/fa";

const categories = [
  {
    key: "ALL",
    label: "All",
    color: "bg-gray-800",
    icon: <FaUsers />,
  },
  {
    key: "HEALTH",
    label: "Health",
    color: "bg-emerald-500",
    icon: <FaHeartbeat />,
  },
  {
    key: "MOTOR",
    label: "Motor",
    color: "bg-blue-500",
    icon: <FaCar />,
  },
  {
    key: "LIFE",
    label: "Life",
    color: "bg-purple-500",
    icon: <FaUsers />,
  },
  {
    key: "TRAVEL",
    label: "Travel",
    color: "bg-orange-500",
    icon: <FaPlane />,
  },
  {
    key: "HOME",
    label: "Home",
    color: "bg-teal-500",
    icon: <FaHome />,
  },
  {
    key: "BUSINESS",
    label: "Business",
    color: "bg-indigo-500",
    icon: <FaBriefcase />,
  },
  {
    key: "FIRE",
    label: "Fire",
    color: "bg-red-500",
    icon: <FaFire />,
  },
];

export default function AdminPolicyFilters({ selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => {
        const isActive = selected === cat.key;

        return (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition
              ${
                isActive
                  ? `${cat.color} text-white shadow-md`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <span className="text-sm">{cat.icon}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

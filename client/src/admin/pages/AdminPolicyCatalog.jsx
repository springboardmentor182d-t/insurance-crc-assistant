// client/src/admin/pages/AdminPolicyCatalog.jsx
import { useState } from "react";
import {
  FaPlus,
  FaCar,
  FaHeart,
  FaHome,
  FaUserShield,
  FaPlane,
  FaBriefcase,
} from "react-icons/fa";

const categories = [
  { label: "All", value: "ALL" },
  { label: "Auto", value: "AUTO", icon: <FaCar /> },
  { label: "Health", value: "HEALTH", icon: <FaHeart /> },
  { label: "Home", value: "HOME", icon: <FaHome /> },
  { label: "Life", value: "LIFE", icon: <FaUserShield /> },
  { label: "Travel", value: "TRAVEL", icon: <FaPlane /> },
  { label: "Business", value: "BUSINESS", icon: <FaBriefcase /> },
];

const initialPolicies = [
  {
    id: 1,
    name: "Auto Secure Plus",
    category: "AUTO",
    price: 299,
    status: "ACTIVE",
    recommended: true,
    features: ["Accident cover", "Zero depreciation", "Roadside assist"],
  },
  {
    id: 2,
    name: "Health Shield",
    category: "HEALTH",
    price: 499,
    status: "RENEWING",
    recommended: false,
    features: ["Cashless hospitals", "Family cover", "Annual checkups"],
  },
  {
    id: 3,
    name: "Home Protect",
    category: "HOME",
    price: 399,
    status: "ACTIVE",
    recommended: true,
    features: ["Fire & theft", "Natural disasters", "Liability cover"],
  },
];

export default function AdminPolicyCatalog() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [policies, setPolicies] = useState(initialPolicies);

  const filteredPolicies =
    activeCategory === "ALL"
      ? policies
      : policies.filter((p) => p.category === activeCategory);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Policy Catalog</h1>
          <p className="text-gray-500">
            Create, manage and publish insurance policies
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          <FaPlus />
          Create Policy
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                activeCategory === cat.value
                  ? "bg-gray-900 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Policy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {policy.name}
              </h2>
              <span
                className={`px-2 py-1 text-xs rounded-full font-semibold
                  ${
                    policy.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {policy.status}
              </span>
            </div>

            {policy.recommended && (
              <span className="inline-block mb-3 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Recommended
              </span>
            )}

            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              {policy.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">
                ${policy.price}
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded-lg hover:bg-black">
                  {policy.status === "ACTIVE" ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

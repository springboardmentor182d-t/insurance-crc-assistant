import React, { useState } from "react";
import { FaHome, FaFileAlt, FaBalanceScale, FaStar, FaUser } from "react-icons/fa";
import {
  LayoutDashboard,
  Home,
  FileText,
  Lightbulb,
  GitCompare,
  LogOut,
  Settings,
  Bookmark,
  User,
  Calculator
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

// ---------------------- Sidebar Menu ----------------------
export function SidebarMenu() {
  const navigate = useNavigate();

  const underDevelopment = () => {
    alert("🚧 This feature is under development");
  };

  return (
    <nav className="bg-blue-500 text-white w-64 min-h-screen p-7 font-bold text-lg">
      <div className="text-2xl mb-8 leading-snug">
        Insurance <br /> CRC Assistant
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/")}
      >
        <FaHome className="text-xl" /> Home
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/policies")}
      >
        <FaFileAlt className="text-xl" /> Policies
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/compare")}
      >
        <FaBalanceScale className="text-xl" /> Compare
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={underDevelopment}
      >
        <FaStar className="text-xl" /> Saved
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={underDevelopment}
      >
        <FaUser className="text-xl" /> Profile
      </div>
    </nav>
  );
}

// ---------------------- Sidebar Filter ----------------------
export function SidebarFilter({ options = { providers: [] }, onFilterChange }) {
  const [filters, setFilters] = useState({
    providers: [],
    duration: null,
    premiumRange: null,
  });

  const toggleProvider = (provider) => {
    const updatedProviders = filters.providers.includes(provider)
      ? filters.providers.filter((p) => p !== provider)
      : [...filters.providers, provider];

    const updated = { ...filters, providers: updatedProviders };
    setFilters(updated);
    onFilterChange && onFilterChange(updated);
  };

  const selectDuration = (duration) => {
    const updated = { ...filters, duration: filters.duration === duration ? null : duration };
    setFilters(updated);
    onFilterChange && onFilterChange(updated);
  };

  const selectPremiumRange = (range) => {
    const updated = { ...filters, premiumRange: filters.premiumRange === range ? null : range };
    setFilters(updated);
    onFilterChange && onFilterChange(updated);
  };

  const applyFilters = () => {
    onFilterChange && onFilterChange(filters);
  };

  return (
    <div className="w-72 p-6 bg-white rounded-lg shadow-md text-sm">
      <h2 className="text-lg font-bold mb-5">Filters</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Provider</h3>
        {options.providers.map((provider) => (
          <label key={provider} className="block mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.providers.includes(provider)}
              onChange={() => toggleProvider(provider)}
              className="mr-2"
            />
            {provider}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Policy Duration</h3>
        {[1, 2, 3].map((year) => (
          <div
            key={year}
            onClick={() => selectDuration(year)}
            className={`cursor-pointer px-2 py-1 rounded mb-2 ${
              filters.duration === year ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {year} Year{year > 1 ? "s" : ""}
          </div>
        ))}
      </div>

      <div className="mb-7">
        <h3 className="text-sm font-semibold mb-2">Premium Range</h3>
        {["Upto ₹5 Lakh", "₹5-10 Lakh", "Above ₹10 Lakh"].map((range) => (
          <div
            key={range}
            onClick={() => selectPremiumRange(range)}
            className={`cursor-pointer px-2 py-1 rounded mb-2 ${
              filters.premiumRange === range ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {range}
          </div>
        ))}
      </div>

      <button
        onClick={applyFilters}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}

// ---------------------- Sidebar (default export) ----------------------
const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "My Claims", path: "/claims", icon: <FileText size={18} /> },
    // PREMIUM CALCULATOR added here
    { name: "Premium Calculator", path: "/premium-calculator", icon: <Calculator size={18} /> },
    { name: "Recommendations", path: "/recommendations", icon: <Lightbulb size={18} /> },
    { name: "Compare Plans", path: "/compare", icon: <GitCompare size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-blue-500 text-white flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-blue-400">
        <span className="bg-white text-blue-500 px-2 py-1 rounded mr-2">CRC</span>
        Insurance
      </div>

      {/* Top quick links */}
      <div className="p-6">
        <div
          className="flex items-center gap-3 cursor-pointer mb-6 text-base"
          onClick={() => navigate("/")}
        >
          <FaHome className="text-xl" /> Home
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer mb-6 text-base"
          onClick={() => navigate("/saved")}
        >
          <FaStar className="text-xl" /> Saved
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer mb-6 text-base"
          onClick={() => navigate("/profile")}
        >
          <FaUser className="text-xl" /> Profile
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-700" : "hover:bg-blue-600 text-blue-100"
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="px-4 py-4 border-t border-blue-400 space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Settings size={18} /> Settings
        </NavLink>

        <button
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => alert("Logging out...")}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

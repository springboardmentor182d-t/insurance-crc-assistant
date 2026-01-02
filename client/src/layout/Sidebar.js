import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  FileText,
  BarChart3,
  Calculator,
  Headphones,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Policy Catalog", path: "/catalog", icon: BookOpen },
    { name: "Recommendations", path: "/recommendations", icon: Sparkles },
    { name: "Claims", path: "/claims", icon: FileText },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Premium Calculator", path: "/calculator", icon: Calculator },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col justify-between">
      
      {/* ================= TOP ================= */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-semibold text-lg">Insure Assist</span>
        </div>

        {/* Menu label */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mb-3">
          Menu
        </p>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            // ⭐ FIX: Recommendation should stay active for ALL recommendation-related routes
            const isRecommendationActive =
              item.path === "/recommendations" &&
              (
                location.pathname === "/recommendations" ||
                location.pathname === "/recommendedPolicies" ||
                location.pathname.endsWith("_insurance_rec")
              );

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                  ${
                    isRecommendationActive || isActive
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="px-4 pb-5 space-y-4">

        {/* Need Help */}
        <div className="bg-indigo-900 text-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Headphones size={18} />
            <p className="font-semibold text-sm">Need Help?</p>
          </div>
          <p className="text-xs text-indigo-200 mb-3">
            Our support team is available 24/7 to assist with your claims.
          </p>
          <button className="w-full bg-white text-indigo-600 text-xs font-semibold py-2 rounded-lg hover:bg-indigo-50 transition">
            Contact Support
          </button>
        </div>

        {/* Profile Navigation */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition
             ${
               isActive
                 ? "bg-indigo-50 text-indigo-600"
                 : "hover:bg-gray-100"
             }`
          }
        >
          <div className="w-9 h-9 rounded-full bg-gray-300" />
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">View Profile</p>
          </div>
        </NavLink>

      </div>
    </aside>
  );
}

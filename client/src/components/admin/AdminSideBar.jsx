import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  ShieldAlert,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react";
import { useProfile } from "../../context/ProfileContext";

export default function AdminSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useProfile();

  const isActive = (path) => location.pathname.startsWith(path);

  const linkBase =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition";
  const activeLink = "bg-indigo-50 text-indigo-600 font-semibold";
  const inactiveLink = "text-gray-600 hover:bg-gray-100";

  return (
    <aside
      className="w-64 bg-white border-r
                 fixed top-0 left-0
                 h-screen
                 flex flex-col justify-between"
    >
      {/* ================= TOP ================= */}
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-semibold text-lg">
            Insure Assist <span className="text-indigo-600">Admin</span>
          </span>
        </div>

        {/* ===== DASHBOARD ===== */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mb-2">
          Dashboard
        </p>
        <nav className="px-3 mb-6">
          <NavLink
            to="/admin/dashboard"
            className={() =>
              `${linkBase} ${
                isActive("/admin/dashboard") ? activeLink : inactiveLink
              }`
            }
          >
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
        </nav>

        {/* ===== FRAUD ===== */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mb-2">
          Fraud
        </p>
        <nav className="px-3 space-y-1">
          <NavLink
            to="/admin/flagged-claims"
            className={() =>
              `${linkBase} ${
                isActive("/admin/flagged-claims")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <AlertTriangle size={18} />
            Flagged Claims
          </NavLink>

          <NavLink
            to="/admin/investigations"
            className={() =>
              `${linkBase} ${
                isActive("/admin/investigations")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <ShieldAlert size={18} />
            Investigations
          </NavLink>

          <NavLink
            to="/admin/fraud-rules"
            className={() =>
              `${linkBase} ${
                isActive("/admin/fraud-rules")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <SlidersHorizontal size={18} />
            Fraud Rules Engine
          </NavLink>
        </nav>

        {/* ===== MANAGEMENT ===== */}
        <p className="px-6 text-xs text-gray-400 uppercase tracking-wide mt-6 mb-2">
          Management
        </p>
        <nav className="px-3">
          <NavLink
            to="/admin/policies"
            className={() =>
              `${linkBase} ${
                isActive("/admin/policies")
                  ? activeLink
                  : inactiveLink
              }`
            }
          >
            <Settings size={18} />
            Policy Management
          </NavLink>
        </nav>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="px-4 pb-5">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="
            w-full mt-4 flex items-center justify-center
            px-4 py-2 rounded-xl
            text-sm font-semibold
            text-red-600
            border border-red-100
            hover:bg-red-50 hover:border-red-200
            transition-all
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

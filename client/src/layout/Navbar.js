import { NavLink } from "react-router-dom";
import { Shield, User, LogOut } from "lucide-react";

export default function Navbar() {
  /* NORMAL LINKS (BLUE) */
  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium pb-0.5 transition-colors duration-200
     ${isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-blue-600
     after:transition-all after:duration-300
     after:w-0 hover:after:w-full
    `;

  /* ADMIN / FRAUD (RED) */
  const adminLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold pb-0.5 transition-colors duration-200
     ${isActive ? "text-red-600" : "text-red-500 hover:text-red-600"}
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-red-500
     after:transition-all after:duration-300
     after:w-0 hover:after:w-full
    `;

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center">
      {/* LEFT – LOGO */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Shield className="text-white" size={18} />
        </div>
        <span className="text-lg font-semibold text-blue-600">
          InsureHub
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-10">
        {/* NAV LINKS */}
        <div className="flex items-center gap-8">
          <NavLink to="/policies" className={linkClass}>
            Policies
          </NavLink>

          <NavLink to="/compare" className={linkClass}>
            Compare
          </NavLink>

          <NavLink to="/recommendations" className={linkClass}>
            Recommendations
          </NavLink>

          <NavLink to="/claims" className={linkClass}>
            Claims
          </NavLink>

          <NavLink to="/admin" className={adminLinkClass}>
            Admin
          </NavLink>

          <NavLink to="/admin/fraud" className={adminLinkClass}>
            Fraud Detection
          </NavLink>

          <NavLink to="/preferences" className={linkClass}>
            Settings
          </NavLink>
        </div>

        {/* PROFILE + LOGOUT */}
        <div className="flex items-center gap-3 text-slate-600">
          <div className="relative group">
            <NavLink
              to="/profile"
              className="flex items-center justify-center w-9 h-9 rounded-full
                         bg-slate-100 hover:bg-blue-100
                         text-slate-600 hover:text-blue-600
                         transition-colors cursor-pointer"
            >
              <User size={22} />
            </NavLink>

            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2
                         bg-slate-800 text-white text-xs
                         px-2 py-1 rounded
                         opacity-0 group-hover:opacity-100
                         transition-opacity whitespace-nowrap"
            >
              Profile
            </span>
          </div>

          <LogOut
            size={22}
            className="cursor-pointer hover:text-red-500"
            title="Logout"
          />
        </div>
      </div>
    </nav>
  );
}

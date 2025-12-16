import {
  LayoutDashboard,
  BookOpen,
  Star,
  FileText,
  BarChart2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function UserSidebar() {
  return (
    <aside className="w-64 bg-white h-screen border-r flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
            IA
          </div>
          <h1 className="text-lg font-semibold">Insure Assist</h1>
        </div>

        <ul className="space-y-2">
          <SidebarItem
            to="/user/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <SidebarItem
            to="/user/policies"
            icon={<BookOpen size={18} />}
            label="My Policies"
          />
          <SidebarItem
            to="/user/claims"
            icon={<FileText size={18} />}
            label="Claims"
          />
          <SidebarItem
            to="/user/recommendations"
            icon={<Star size={18} />}
            label="Recommendations"
          />
          <SidebarItem
            to="/user/analytics"
            icon={<BarChart2 size={18} />}
            label="Analytics"
          />
        </ul>
      </div>

      {/* Support Card */}
      <div className="bg-purple-600 text-white p-4 rounded-xl">
        <p className="text-sm mb-2">
          Need help? Our support team is available 24/7.
        </p>
        <button className="bg-white text-purple-600 w-full py-2 rounded-lg text-sm font-medium">
          Contact Support
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-purple-100 text-purple-700"
            : "text-gray-700 hover:bg-purple-100"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

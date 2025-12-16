import {
  LayoutDashboard,
  Flag,
  Search,
  ShieldCheck,
  ClipboardList,
  BarChart,
  FileText,
  Users,
  Settings,
  Lock,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
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

        {/* Sections */}
        <SidebarSection title="Dashboard & Monitoring">
          <SidebarItem
            to="/admin/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <SidebarItem
            to="/admin/flagged-claims"
            icon={<Flag size={18} />}
            label="Flagged Claims"
          />
          <SidebarItem
            to="/admin/investigations"
            icon={<Search size={18} />}
            label="Investigations"
          />
        </SidebarSection>

        <SidebarSection title="Fraud Rules & Intelligence">
          <SidebarItem
            to="/admin/fraud-rules"
            icon={<ShieldCheck size={18} />}
            label="Fraud Rules Engine"
          />
          <SidebarItem
            to="/admin/rule-performance"
            icon={<ClipboardList size={18} />}
            label="Rule Performance"
          />
        </SidebarSection>

        <SidebarSection title="Analytics">
          <SidebarItem
            to="/admin/fraud-analytics"
            icon={<BarChart size={18} />}
            label="Fraud Analytics"
          />
          <SidebarItem
            to="/admin/reports"
            icon={<FileText size={18} />}
            label="Reports"
          />
        </SidebarSection>

        <SidebarSection title="System & Admin">
          <SidebarItem
            to="/admin/users"
            icon={<Users size={18} />}
            label="Users & Roles"
          />
          <SidebarItem
            to="/admin/settings"
            icon={<Settings size={18} />}
            label="System Settings"
          />
          <SidebarItem
            to="/admin/audit-logs"
            icon={<Lock size={18} />}
            label="Audit Logs"
          />
        </SidebarSection>
      </div>

      {/* User Profile */}
      <div className="bg-gray-100 p-3 rounded-xl flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40?u=admin"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">Alexandra M.</p>
          <p className="text-xs text-gray-500">Super Admin</p>
        </div>
      </div>
    </aside>
  );
}

function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      <p className="text-xs text-gray-500 uppercase font-semibold mb-2 px-2">
        {title}
      </p>
      <ul className="space-y-1">{children}</ul>
    </div>
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

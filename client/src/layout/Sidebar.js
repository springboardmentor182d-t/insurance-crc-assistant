import { NavLink } from "react-router-dom";
import { Calculator } from "lucide-react";
import {
  Home,
  FileText,
  GitCompare,
  Bookmark,
  User
} from "lucide-react";

const Sidebar = () => {
  const activeClass =
    "flex items-center gap-3 px-6 py-3 bg-white/20 rounded-lg";
  const normalClass =
    "flex items-center gap-3 px-6 py-3 hover:bg-white/10 rounded-lg";

  return (
    <aside className="w-64  bg-[#0D99FF] text-white flex flex-col">
      
      
      <div className="px-6 py-6 text-xl font-semibold flex items-center gap-2">
        🛡️ Insurance CRC Assistant
      </div>

      
      <nav className="flex flex-col gap-2 mt-6">
        <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>
          <Home size={20} />
          Home
        </NavLink>

        <NavLink to="/policies" className={({ isActive }) => isActive ? activeClass : normalClass}>
          <FileText size={20} />
          Policies
        </NavLink>

        <NavLink to="/premium-calculator" className="flex items-center gap-3 text-white px-4 py-3 rounded hover:bg-blue-500"
>          <Calculator size={18} />
             Premium Calculator
        </NavLink>

        <NavLink to="/compare" className={({ isActive }) => isActive ? activeClass : normalClass}>
          <GitCompare size={20} />
          Compare
        </NavLink>

        <NavLink to="/saved" className={({ isActive }) => isActive ? activeClass : normalClass}>
          <Bookmark size={20} />
          Saved
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? activeClass : normalClass}>
          <User size={20} />
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

import { Bell, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeClass =
    "text-blue-600 border-b-2 border-blue-600 pb-1";
  const normalClass =
    "text-gray-700 hover:text-blue-600";

  return (
    <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
        🛡️ Insure Hub
      </div>

      {/* Navigation */}
      <nav className="flex gap-8 font-medium">
        <NavLink
          to="/policies"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          My Policies
        </NavLink>

        <NavLink
          to="/policy-browse"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Policy Browse
        </NavLink>

        <NavLink
          to="/premium-calculator"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Premium Calculator
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Help
        </NavLink>
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <UserCircle className="w-7 h-7 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;

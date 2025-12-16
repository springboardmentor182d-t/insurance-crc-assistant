import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  FileText,
  Lightbulb,
  GitCompare,
  LogOut,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Home",
      path: "/home",
      icon: <Home size={18} />,
    },
    {
      name: "My Claims",
      path: "/claims",
      icon: <FileText size={18} />,
    },
    {
      name: "Recommendations",
      path: "/recommendations",
      icon: <Lightbulb size={18} />,
    },
    {
      name: "Compare Plans",
      path: "/#",
      icon: <GitCompare size={18} />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-blue-500 text-white flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-blue-400">
        <span className="bg-white text-blue-500 px-2 py-1 rounded mr-2">
          CRC
        </span>
        Insurance 
      </div>

      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
               ${
                 isActive
                   ? "bg-blue-700"
                   : "hover:bg-blue-600 text-blue-100"
               }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      
      <div className="px-4 py-4 border-t border-blue-400 space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </NavLink>

        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  FileText,
  Calculator,
  Headphones,
  Bookmark,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useProfile } from "../context/ProfileContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, loading } = useProfile();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Policy Catalog", path: "/catalog", icon: BookOpen },
    { name: "Recommendations", path: "/recommendations", icon: Sparkles },
    { name: "Claims", path: "/claims", icon: FileText },
    { name: "Premium Calculator", path: "/premium-calculator", icon: Calculator },
    { name: "Saved Quotes", path: "/saved-quotes", icon: Bookmark },
    { name: "My Policies", path: "/my-policies", icon: ShieldCheck },
  ];

  const isPolicySectionActive =
    location.pathname.startsWith("/catalog") ||
    location.pathname.startsWith("/policies") ||
    location.pathname.startsWith("/compare") ||
    location.pathname.startsWith("/quote");

  return (
    <aside
      className="
        hidden md:flex
        fixed left-0 top-0
        w-64 h-screen
        flex-col justify-between
        bg-[var(--bg-card)]
        border-r border-[var(--border)]
      "
    >
      {/* TOP */}
      <div>
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-semibold text-lg text-[var(--text-main)]">
            Insure Assist
          </span>
        </div>

        <p className="px-6 text-xs uppercase tracking-wide mb-3 text-[var(--text-muted)]">
          Menu
        </p>

        <nav className="px-3 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            const isRecommendationActive =
              item.path === "/recommendations" &&
              (location.pathname === "/recommendations" ||
                location.pathname.endsWith("recresults"));

            const isPolicyActive =
              item.path === "/catalog" && isPolicySectionActive;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                    isPolicyActive || isRecommendationActive || isActive
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-main)]"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="px-4 pb-5 space-y-4">
        <div className="rounded-xl p-4 bg-indigo-600 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Headphones size={18} />
            <p className="font-semibold text-sm">Need Help?</p>
          </div>

          <p className="text-xs text-indigo-200 mb-3">
            Our support team is available 24/7.
          </p>

          <button
            onClick={() => navigate("/support")}
            className="w-full bg-white text-indigo-600 text-xs font-semibold py-2 rounded-lg"
          >
            Contact Support
          </button>
        </div>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-main)]"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--bg-main)] border border-[var(--border)] flex items-center justify-center">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-semibold text-[var(--text-main)]">
              {profile?.name?.[0] || "U"}
            </span>
          )}
        </div>


          <div>
            <p className="text-sm font-semibold text-[var(--text-main)]">
              {profile?.name || "User"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">View Profile</p>
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

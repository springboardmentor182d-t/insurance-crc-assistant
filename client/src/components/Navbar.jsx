import { Search, Bell } from "lucide-react";

export default function Navbar() {
  const role = localStorage.getItem("role") || "user";

  // Role-based content
  const title =
    role === "admin" ? "Fraud & Analytics Dashboard" : "Dashboard";
  const subtitle =
    role === "admin"
      ? "Monitoring system performance and fraud detection across 12 regions."
      : "Welcome back, John!";
  const actionButton =
    role === "admin" ? "New Investigation" : "Get a Quote";

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder={
              role === "admin"
                ? "Search claims, rules…"
                : "Search policies, claims…"
            }
            className="bg-transparent outline-none"
          />
        </div>

        {/* Notifications */}
        <Bell className="w-6 h-6 text-gray-600" />

        {/* Action Button */}
        <button className="bg-purple-600 text-white px-4 py-2 rounded-xl">
          {actionButton}
        </button>
      </div>
    </div>
  );
}
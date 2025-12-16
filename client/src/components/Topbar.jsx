import React from "react";
import { Search, Bell, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white p-6 border-b border-white/50 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, John! Here’s your insurance portfolio status.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-500" />
            <input className="bg-transparent outline-none w-64" placeholder="Search policies, claims..." />
          </div>

          <Bell size={20} className="text-gray-600" />
          <UserCircle2 size={26} className="text-gray-600" />

          <button className="bg-gradient-to-br from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full shadow">
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  );
}

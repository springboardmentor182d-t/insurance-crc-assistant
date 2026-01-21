import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function PageContainer() {
  return (
    <div
      className="
        min-h-screen flex
        bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-100
        dark:from-gray-950 dark:via-gray-900 dark:to-black
        text-gray-900 dark:text-gray-100
      "
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <main className="flex-1 px-8 py-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

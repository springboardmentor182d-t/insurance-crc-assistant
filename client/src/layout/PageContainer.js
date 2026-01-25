import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function PageContainer() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* STATIC SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className="
          flex-1
          px-4 sm:px-6 lg:px-8
          py-6
          overflow-y-auto
          md:ml-64
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

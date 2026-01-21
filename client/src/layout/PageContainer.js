import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function PageContainer() {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

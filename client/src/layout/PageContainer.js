import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function PageContainer() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-6 py-4">
        <Outlet />
      </main>
    </>
  );
}

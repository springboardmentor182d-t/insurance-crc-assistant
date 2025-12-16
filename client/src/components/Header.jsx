import { Search } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm text-gray-500">Oct 24, 2023</p>
        <h1 className="text-2xl font-bold">Fraud & Analytics Dashboard</h1>
        <p className="text-sm text-gray-500">
          Monitoring system performance and fraud detection across 12 regions.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search claims by ID, rule name, or investigator..."
            className="bg-transparent outline-none text-sm"
          />
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
          New Investigation
        </button>
      </div>
    </div>
  );
}
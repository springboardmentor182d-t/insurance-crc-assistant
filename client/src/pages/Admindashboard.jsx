import React from "react";

const claimsData = [
  { id: "CLM001", holder: "Alice Johnson", type: "Auto", date: "Oct 20, 2023", status: "Pending", amount: "$1200.50" },
  { id: "CLM002", holder: "Bob Williams", type: "Home", date: "Oct 18, 2023", status: "Approved", amount: "$5500.00" },
  { id: "CLM003", holder: "Charlie Brown", type: "Health", date: "Oct 15, 2023", status: "Investigation", amount: "$300.00" },
  { id: "CLM004", holder: "Diana Prince", type: "Life", date: "Oct 10, 2023", status: "Pending", amount: "$250000.00" },
  { id: "CLM005", holder: "Ethan Hunt", type: "Auto", date: "Oct 22, 2023", status: "Pending", amount: "$800.00" },
  { id: "CLM006", holder: "Fiona Glenn", type: "Home", date: "Oct 21, 2023", status: "Pending", amount: "$750.00" },
  { id: "CLM007", holder: "Grace Hopper", type: "Health", date: "Oct 19, 2023", status: "Pending", amount: "$1500.00" },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-700",
  Investigation: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-blue-500 text-white p-4 flex flex-col">
        <div className="w-10 h-10 bg-white text-blue-500 rounded-xl flex items-center justify-center mb-8 text-lg">
          🌀
        </div>

        <div className="space-y-2 text-sm">
          <div className="px-3 py-2 rounded-lg opacity-90 hover:bg-white/20 cursor-pointer">
            Admin Overview
          </div>
          <div className="px-3 py-2 rounded-lg bg-white/20 cursor-pointer">
            Claims Management
          </div>
          <div className="px-3 py-2 rounded-lg opacity-90 hover:bg-white/20 cursor-pointer">
            Fraud Detection & Tasks
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <div />
          <div className="flex items-center gap-4">
            <button className="text-lg">🔔</button>
            <span className="text-sm">Admin View ⌄</span>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-auto">
          <h1 className="text-xl font-semibold mb-5">
            Claims Management Dashboard
          </h1>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              ["Total Claims", "7", "All claims on record"],
              ["Approvals Today", "0", "Claims approved within 24 hours"],
              ["Pending Investigations", "1", "Claims flagged for review"],
              ["Resolved Claims", "2", "Approved or rejected claims"],
            ].map(([title, value, sub]) => (
              <div key={title} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-lg font-semibold">{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-3">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Search claims by ID or policy holder..."
            />
            <select className="border rounded-lg px-3 py-2 text-sm bg-white">
              <option>All Statuses</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm bg-white">
              <option>All Policy Types</option>
            </select>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Bulk actions */}
          <div className="flex gap-2 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm opacity-60">
              Approve Selected (0)
            </button>
            <button className="border px-4 py-2 rounded-lg text-sm opacity-60">
              Reject Selected (0)
            </button>
            <button className="border px-4 py-2 rounded-lg text-sm opacity-60">
              Assign Investigator (0)
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-3">All Claims</h2>

            <table className="w-full text-sm border-collapse">
              <thead className="text-gray-500">
                <tr>
                  <th className="py-2"><input type="checkbox" /></th>
                  <th>Claim ID</th>
                  <th>Policy Holder</th>
                  <th>Policy Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {claimsData.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="py-2"><input type="checkbox" /></td>
                    <td>{c.id}</td>
                    <td>{c.holder}</td>
                    <td>{c.type}</td>
                    <td>{c.date}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.amount}</td>
                    <td className="flex gap-2 py-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
                        Approve
                      </button>
                      <button className="border border-red-400 text-red-500 bg-red-50 px-3 py-1 rounded text-xs">
                        ⚠ Fraud?
                      </button>
                      <button className="bg-gray-100 px-3 py-1 rounded text-xs">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>Showing 7 of 7 claims</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 rounded opacity-60">
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded opacity-60">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

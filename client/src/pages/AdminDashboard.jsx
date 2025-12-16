import React from 'react'

const AdminDashboard = () => {
  return (
   <div className="flex bg-gray-100 text-gray-800 " >
      <aside className="w-64 bg-white shadow-md pl-6 pr-6 flex flex-col justify-between ">
        <div>
          <div className="mb-8 flex items-center space-x-3">
             <img src="https://cdn3.emoji.gg/emojis/39260-admin-purple.png" alt="logo"className="w-8 h-8"/>
            <div>
               <h1 className="text-lg font-bold">Insure Assist</h1>
               <p className="text-xs uppercase text-gray-500 font-semibold">
               Admin Panel
               </p>
            </div>
        </div>

          
          <nav className=" mt-8 space-y-8 ">
  <section>
    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
      Dashboard & Monitoring
    </h2>

    <ul className="space-y-5">
      <li >
        <a href="#" className="flex items-center text-blue-600 font-semibold space-x-3">
          <span>📊</span>
          <span>Dashboard</span>
        </a>
      </li>

      <li className="flex items-center text-gray-600 space-x-3">
        <span>⚠️</span>
        <span>Flagged Claims</span>
      </li>

      <li className="flex items-center text-gray-600 space-x-3">
        <span>🔍</span>
        <span>Investigations</span>
      </li>
    </ul>
  </section>

  <section className='space-y-5'>
    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
      Fraud Rules & Intelligence
    </h2>

    <ul className="space-y-5">
      <li className="flex items-center text-gray-600 space-x-3">
        <span>🛠️</span>
        <span>Fraud Rules Engine</span>
      </li>

      <li className="flex items-center text-gray-600 space-x-3">
        <span>📊</span>
        <span>Rule Performance</span>
      </li>
    </ul>
  </section>

  <section>
    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
      Analytics
    </h2>

    <ul className="space-y-5">
      <li className="flex items-center text-gray-600 space-x-3">
        <span>📈</span>
        <span>Fraud Analytics</span>
      </li>

      <li className="flex items-center text-gray-600 space-x-3">
        <span>📑</span>
        <span>Reports</span>
      </li>
    </ul>
  </section>

  <section>
    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
      System & Admin
    </h2>

    <ul className="space-y-5">
      <li className="flex items-center text-gray-600 space-x-3">
        <span>👥</span>
        <span>Users & Roles</span>
      </li>

      <li className="flex items-center text-gray-600 space-x-3">
        <span>⚙️</span>
        <span>System Settings</span>
      </li>

      <li className="flex items-center text-gray-600 space-x-3">
        <span>📜</span>
        <span>Audit Logs</span>
      </li>
    </ul>
  </section>
</nav>
</div>
<div className="flex items-center space-x-3 mt-8">
  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
  👤
</div>

  <div>
    <p className="font-semibold">Alexandra M</p>

    <div className="flex items-center space-x-2">
      <p className="text-xs text-green-600">Super Admin</p>

      {/* Logout Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        title="Logout"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>
    </div>
  </div>
</div>


        

      </aside>

      <main className="flex-1 p-8">

        <div className="flex items-center justify-between mb-8">
  <div>
    <h2 className="text-2xl font-bold text-gray-900">
      Fraud & Analytics Dashboard
    </h2>
    <p className="text-gray-600 text-sm">
      Monitoring system performance and fraud detection across 12 regions.
    </p>
  </div>
  <div className="flex items-center gap-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-100 ml-3"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
      🔔
    </button>

    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
      ❓
    </button>
  </div>
</div>


        
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-5 rounded shadow text-center">
            <div className="text-blue-600 mb-2">📋</div>
            <p className="text-sm text-gray-600">TOTAL CLAIMS</p>
            <p className="text-3xl font-bold">1,240 <span className="text-gray-400 text-sm font-normal">today</span></p>
            <p className="text-green-600 text-sm mt-1">+5.2%</p>
          </div>
          <div className="bg-white p-5 rounded shadow text-center">
            <div className="text-red-600 mb-2">⚠️</div>
            <p className="text-sm text-gray-600">FLAGGED CLAIMS</p>
            <p className="text-3xl font-bold text-red-700">85 <span className="text-red-600 text-sm font-semibold ml-2">Action Needed</span></p>
            <p className="text-red-400 text-sm mt-1">+12</p>
          </div>
          <div className="bg-white p-5 rounded shadow text-center">
            <div className="text-gray-700 mb-2">💰</div>
            <p className="text-sm text-gray-600">RISK EXPOSURE</p>
            <p className="text-3xl font-bold">$450k <span className="text-gray-400 text-sm font-normal">est</span></p>
            <p className="text-gray-500 text-sm mt-1">Pending</p>
          </div>
          <div className="bg-white p-5 rounded shadow text-center">
            <div className="text-green-500 mb-2">🔒</div>
            <p className="text-sm text-gray-600">AVG FRAUD SCORE</p>
            <p className="text-3xl font-bold text-gray-700">42 <span className="text-gray-400 text-sm font-normal">/100</span></p>
            <p className="text-green-600 text-sm mt-1">Stable</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-red-600 mb-8">
          <div className="flex items-center space-x-3">
            <div className="text-red-600 text-xl">🔔</div>
            <div className="text-sm text-gray-700 font-semibold">
              High Risk Activity Detected
              <p className="text-xs font-normal text-gray-500">
                7 new claims flagged as <span className="text-red-600 font-bold uppercase">HIGH RISK</span> in the last hour. Duplicate documents detected.
              </p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            View Alerts →
          </button>
        </div>

        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold text-lg mb-4">Fraud Rate Analysis</h3>
          <p className="text-xs text-gray-500 mb-4">Claims vs Flagged Incidents (Last 7 Days)</p>
          <div className="h-40">
  <svg viewBox="0 0 100 40" className="w-full h-full">
    <line x1="0" y1="35" x2="100" y2="35" stroke="#e5e7eb" strokeWidth="0.5" />
    <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
    <line x1="0" y1="15" x2="100" y2="15" stroke="#e5e7eb" strokeWidth="0.5" />
    <polyline
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      points="0,30 15,22 30,25 45,18 60,20 75,12 100,15"
    />
    <polyline
      fill="none"
      stroke="#dc2626"
      strokeWidth="2"
      points="0,34 15,30 30,28 45,26 60,24 75,22 100,20"
    />
  </svg>
</div>

        </section>
        <section className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow col-span-1 flex flex-col items-center">
            <h3 className="font-semibold mb-4">Risk Distribution</h3>
            <div className="relative w-24 h-24 mb-2">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="text-blue-600"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray="53 100"
                />
                <path
                  className="text-orange-500"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray="29 100"
                  strokeDashoffset="53"
                />
                <path
                  className="text-red-600"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray="18 100"
                  strokeDashoffset="82"
                />
              </svg>
              <div className="absolute inset-0 flex justify-center items-center text-lg font-bold text-gray-800">85</div>
            </div>
            <ul className="text-xs space-y-2">
              <li className="flex items-center space-x-2">
                <span className="block w-3 h-3 bg-red-600 rounded-full"></span>
                <span>High 18%</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="block w-3 h-3 bg-orange-500 rounded-full"></span>
                <span>Medium 29%</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="block w-3 h-3 bg-blue-600 rounded-full"></span>
                <span>Low 53%</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded shadow col-span-2">
            <h3 className="font-semibold mb-4">Top Triggered Rules</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex justify-between text-sm mb-1 font-semibold">
                  <span>Duplicate Document</span>
                  <span>432</span>
                </div>
                <div className="h-2 bg-purple-500 rounded" style={{ width: "75%" }}></div>
              </li>
              <li>
                <div className="flex justify-between text-sm mb-1 font-semibold">
                  <span>IP Blacklist</span>
                  <span>215</span>
                </div>
                <div className="h-2 bg-indigo-400 rounded" style={{ width: "40%" }}></div>
              </li>
              <li>
                <div className="flex justify-between text-sm mb-1 font-semibold">
                  <span>Velocity Check</span>
                  <span>160</span>
                </div>
                <div className="h-2 bg-indigo-300 rounded" style={{ width: "30%" }}></div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
)
}

export default AdminDashboard

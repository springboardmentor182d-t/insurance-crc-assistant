import React from "react";

export default function ProfileSummary() {
  return (
    <aside className="bg-white rounded-2xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold mb-3">Profile Summary</h4>

      <div className="flex flex-col items-center">
        <img src="https://i.pravatar.cc/80" alt="profile" className="w-20 h-20 rounded-full mb-3" />
        <div className="text-center">
          <div className="font-semibold">John Doe</div>
          <div className="text-xs text-gray-500">Policyholder ID: 893-221-00</div>
        </div>

        <div className="mt-4 w-full grid grid-cols-2 gap-3">
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">TENURE</div>
            <div className="font-bold">3 Years</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">RISK SCORE</div>
            <div className="font-bold">Low</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

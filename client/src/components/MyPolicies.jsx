import React from "react";

const policies = [
  { icon: "🚗", title: "Auto Insurance", tag: "ACTIVE", premium: "$145/mo", renew: "Aug 12, 2024" },
  { icon: "🏠", title: "Homeowners", tag: "ACTIVE", premium: "$85/mo", renew: "Sep 01, 2024" },
  { icon: "💖", title: "Health Insurance", tag: "RENEWING", premium: "$210/mo", renew: "Jul 01, 2024" },
];

export default function MyPolicies() {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">My Policies</h3>
        <button className="text-sm text-purple-600">View All →</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {policies.map((p) => (
          <div key={p.title} className="bg-gray-50 rounded-xl p-4 border">
            <div className="flex justify-between items-start">
              <div className="text-2xl">{p.icon}</div>
              <div className={`text-xs px-2 py-1 rounded-full ${p.tag === "RENEWING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {p.tag}
              </div>
            </div>

            <h4 className="font-semibold mt-3">{p.title}</h4>
            <p className="text-sm text-gray-500 mt-1">Policy #: XXX-XXXX</p>

            <div className="mt-4 text-sm text-gray-600">
              <div>Premium: <span className="font-semibold">{p.premium}</span></div>
              <div>Next Renewal: <span className="font-semibold">{p.renew}</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

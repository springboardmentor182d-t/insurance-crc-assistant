import React from "react";

const list = [
  { title: "Life Insurance Plus", desc: "Secure your family's future with expanded coverage." },
  { title: "Umbrella Policy", desc: "Extra liability layer starting at $15/mo." },
];

export default function Recommended() {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recommended</h3>

      <div className="space-y-3">
        {list.map((i) => (
          <div key={i.title} className="bg-gray-50 p-3 rounded-xl border">
            <div className="font-semibold">{i.title}</div>
            <div className="text-sm text-gray-500">{i.desc}</div>
            <button className="mt-2 text-purple-600 text-sm">View Details →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

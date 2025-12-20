export default function Sidebar() {
  const items = ["Dashboard", "My Policies", "Claims", "Recommendations", "Analytics"];
  return (
    <aside className="w-64 bg-white shadow-sm border-r p-4 space-y-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="mt-6 text-sm text-gray-600 bg-gray-50 rounded p-3">
        Need help? Our support team is available 24/7.
      </div>
    </aside>
  );
}
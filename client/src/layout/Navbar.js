export default function TopNavbar() {
  return (
    <header className="h-16 bg-gray-50 flex items-center justify-end px-8">
      {/* Right actions */}
      <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90 transition">
        Get a Quote
      </button>
    </header>
  );
}

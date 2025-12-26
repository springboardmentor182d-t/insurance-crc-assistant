export default function SmallStatCard({ title, value, subText, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm
      hover:shadow-md transition-all duration-300">

      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <p className="text-sm text-gray-500">{title}</p>
      </div>

      <h3 className="text-lg font-semibold">{value}</h3>
      <p className="text-xs text-green-600 mt-1">{subText}</p>
    </div>
  );
}

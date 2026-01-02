export default function StatCard({ title, value, growth, icon: Icon, color }) {
  const isPositive = growth >= 0;

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm
                    hover:shadow-md transition-all
                    flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          {value}
        </h2>

        <p className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "+" : ""}
          {growth}% from last month
        </p>
      </div>

      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`${color.replace("bg", "text")} w-5 h-5`} />
      </div>
    </div>
  );
}

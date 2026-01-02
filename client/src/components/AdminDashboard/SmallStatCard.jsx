export default function SmallStatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm
                    hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-md ${color} bg-opacity-10`}>
          <Icon className={`${color.replace("bg", "text")} w-4 h-4`} />
        </div>
        <p className="text-sm text-gray-500">{title}</p>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {value ?? "N/A"}
      </h3>
    </div>
  );
}

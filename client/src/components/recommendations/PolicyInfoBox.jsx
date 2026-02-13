export default function PolicyInfoBox({
  label,
  value,
  highlight = false,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-xl px-5 py-4
        ${
          highlight
            ? "bg-green-100 border border-green-200"
            : "bg-blue-100 border border-blue-200"
        }
        ${className}
      `}
    >
      <p className="text-xs text-slate-600 mb-1">
        {label}
      </p>

      <p
        className={`text-base font-semibold ${
          highlight ? "text-green-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

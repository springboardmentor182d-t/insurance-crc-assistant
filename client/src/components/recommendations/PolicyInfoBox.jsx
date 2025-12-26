export default function PolicyInfoBox({ label, value, highlight }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-medium ${highlight ? "text-green-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}

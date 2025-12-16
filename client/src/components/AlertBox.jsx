export default function AlertBox() {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
      <h4 className="font-semibold text-red-700">High Risk Activity Detected</h4>
      <p className="text-sm text-red-600">
        7 new claims flagged as HIGH RISK in the last hour. Duplicate documents detected.
      </p>
      <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm">
        View Alerts
      </button>
    </div>
  );
}
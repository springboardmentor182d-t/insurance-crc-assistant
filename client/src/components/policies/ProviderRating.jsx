export default function ProviderRating() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Provider Rating</h3>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Claim Settlement</span>
          <span className="text-blue-600 font-medium">95%</span>
        </div>
        <div className="flex justify-between">
          <span>Customer Service</span>
          <span className="text-blue-600 font-medium">4.5/5</span>
        </div>
        <div className="flex justify-between">
          <span>TAT (Days)</span>
          <span className="text-blue-600 font-medium">7</span>
        </div>
      </div>
    </div>
  );
}

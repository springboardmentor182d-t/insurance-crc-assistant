export default function RecommendationActions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold mb-4">Quick Actions</h3>

      <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">
        Buy Now
      </button>

      <button className="w-full border border-blue-600 text-blue-600 py-2 rounded mb-2">
        Add to Compare
      </button>

      <button className="w-full text-sm text-gray-500">
        Save for Later
      </button>
    </div>
  );
}

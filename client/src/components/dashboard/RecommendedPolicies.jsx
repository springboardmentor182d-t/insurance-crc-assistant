import { FiStar } from "react-icons/fi";
export default function RecommendedPolicies({ recommendations = [] }) {
  if (!recommendations.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <FiStar className="text-yellow-500 text-xl" />
          <h3 className="text-lg font-semibold text-gray-800">Recommended</h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">Tailored for you.</p>
        <p className="text-gray-500 text-sm">No recommendations available.</p>
      </div>
    );
  }

  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <FiStar className="text-yellow-500 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">Recommended</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">Tailored for you.</p>

      {/* Cards */}
      {recommendations.map((r) => (
        <div key={r.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-2">
          <h4 className="text-md font-semibold text-gray-800">{r.title}</h4>
          <p className="text-sm text-gray-600">{r.description}</p>
          {r.link && (
            <a
              href={r.link}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              {r.action || "View →"}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
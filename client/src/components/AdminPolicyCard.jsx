// client/src/admin/components/AdminPolicyCard.jsx
import {
  FaEdit,
  FaCheckCircle,
  FaPauseCircle,
  FaStar,
} from "react-icons/fa";

export default function AdminPolicyCard({ policy, onToggleStatus, onEdit }) {
  const isActive = policy.status === "ACTIVE";

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {policy.name}
        </h2>

        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full
            ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {policy.status}
        </span>
      </div>

      {/* Recommended */}
      {policy.recommended && (
        <div className="flex items-center gap-1 mb-3 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full w-fit">
          <FaStar className="text-xs" />
          Recommended
        </div>
      )}

      {/* Features */}
      <ul className="text-sm text-gray-600 mb-4 space-y-1">
        {policy.features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">
          ${policy.price}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(policy)}
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onToggleStatus(policy.id)}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg text-white
              ${
                isActive
                  ? "bg-gray-700 hover:bg-gray-900"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {isActive ? <FaPauseCircle /> : <FaCheckCircle />}
            {isActive ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { normalizePolicy } from "../../utils/normalizePolicy";

export default function RecommendationActions({ policy }) {
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, selected } = useCompare();

  // Safety
  if (!policy || !policy.policy) return null;

  const p = policy.policy;

  const isCompared = selected.some((item) => item.id === p.id);

  const handleCompare = () => {
    if (isCompared) {
      removeFromCompare(p.id);
    } else {
      // ✅ ONE SOURCE OF TRUTH
      const normalized = normalizePolicy(p);
      addToCompare(normalized);
      navigate("/compare");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold mb-4">Quick Actions</h3>

      <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">
        Buy Now
      </button>

      <button
        onClick={handleCompare}
        className={`w-full py-2 rounded mb-2 border transition ${
          isCompared
            ? "bg-red-50 border-red-400 text-red-600 hover:bg-red-100"
            : "border-blue-600 text-blue-600 hover:bg-blue-50"
        }`}
      >
        {isCompared ? "Remove from Compare" : "Add to Compare"}
      </button>

      <button className="w-full text-sm text-gray-500">
        Save for Later
      </button>
    </div>
  );
}

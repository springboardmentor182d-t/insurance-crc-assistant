import { Bookmark, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyPolicies({ policies = [] }) {
  const navigate = useNavigate();

  const goToPolicy = (p) => {
    navigate(`/policies/${p.policy_type}/${p.policy_id}`);
  };

  if (!policies.length) {
    return (
      <div className="bg-white rounded-xl p-6 border text-center">
        <Bookmark className="mx-auto text-indigo-400 mb-3" size={28} />
        <p className="text-gray-600 text-sm mb-2">
          You haven’t saved any quotes yet
        </p>
        <button
          onClick={() => navigate("/catalog")}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          Browse policy catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Saved Quotes</h3>
        <button
          onClick={() => navigate("/saved-quotes")}
          className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {policies.map((p) => (
          <div
            key={p.id}
            onClick={() => goToPolicy(p)}
            className="border rounded-lg p-4 cursor-pointer hover:border-indigo-400 hover:shadow-sm transition"
          >
            <h4 className="font-medium text-gray-800">
              {p.policy_name}
            </h4>
            <p className="text-xs text-gray-500">
              {p.insurer_name} • {p.tenure} yr
            </p>
            <p className="text-sm font-semibold text-indigo-600 mt-1">
              ₹{p.total_premium.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Bookmark, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyPolicies({ policies = [] }) {
  const navigate = useNavigate();

  const goToPolicy = (p) => {
    navigate(`/policies/${p.policy_type}/${p.policy_id}`);
  };

  if (!policies.length) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
        <Bookmark
          className="mx-auto text-[var(--accent)] mb-3"
          size={28}
        />

        <p className="text-[var(--text-muted)] text-sm mb-2">
          You haven’t saved any quotes yet
        </p>

        <button
          onClick={() => navigate("/catalog")}
          className="text-[var(--accent)] text-sm font-medium hover:underline"
        >
          Browse policy catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-main)]">
          Saved Quotes
        </h3>

        <button
          onClick={() => navigate("/saved-quotes")}
          className="text-[var(--accent)] text-sm hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {policies.map((p) => (
          <div
            key={p.id}
            onClick={() => goToPolicy(p)}
            className="
              border border-[var(--border)]
              rounded-lg p-4 cursor-pointer
              hover:border-[var(--accent)]
              hover:shadow-sm transition
              bg-[var(--bg-main)]
            "
          >
            <h4 className="font-medium text-[var(--text-main)]">
              {p.policy_name}
            </h4>

            <p className="text-xs text-[var(--text-muted)]">
              {p.insurer_name} • {p.tenure} yr
            </p>

            <p className="text-sm font-semibold text-[var(--accent)] mt-1">
              ₹{p.total_premium.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPolicies } from "../../api";

export default function ActivePolicyCard() {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies()
      .then((res) => {
        setPolicy(res.data?.[0] || null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
        <p className="text-sm text-[var(--text-muted)]">
          Loading active policy…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col h-full">
      {/* HEADER */}
      <p className="text-sm text-[var(--text-muted)] mb-1">
        Active Policy
      </p>

      {policy ? (
        <>
          {/* POLICY INFO */}
          <div className="flex-1">
            <p className="text-lg font-semibold text-[var(--text-main)]">
              {policy.policy_name}
            </p>

            <p className="text-sm text-[var(--text-muted)] mb-4">
              {policy.provider_name}
            </p>

            {/* DETAILS */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">
                  Coverage
                </span>
                <span className="font-medium text-[var(--text-main)]">
                  ₹{policy.coverage_amount}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">
                  Renewal
                </span>
                <span className="font-medium text-[var(--text-main)]">
                  {policy.renewal_date}
                </span>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <button
            onClick={() => navigate("/my-policies")}
            className="
              mt-4 text-sm font-medium
              text-[var(--accent)]
              hover:underline
              self-start
            "
          >
            View all policies →
          </button>
        </>
      ) : (
        <>
          {/* EMPTY STATE */}
          <div className="flex-1">
            <p className="text-sm text-[var(--text-muted)] mt-2">
              You haven’t added any active policies yet.
            </p>
          </div>

          {/* ACTION */}
          <button
            onClick={() => navigate("/my-policies")}
            className="
              mt-4 px-4 py-2
              text-sm rounded-lg
              bg-[var(--accent)]
              text-white
              hover:opacity-90
              w-fit
            "
          >
            Add your policies
          </button>
        </>
      )}
    </div>
  );
}

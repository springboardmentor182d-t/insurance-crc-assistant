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
      <div className="bg-white rounded-xl border p-6">
        <p className="text-sm text-gray-500">Loading active policy…</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6 flex flex-col h-full">
      {/* HEADER */}
      <p className="text-sm text-gray-500 mb-1">Active Policy</p>

      {policy ? (
        <>
          {/* POLICY INFO */}
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900">
              {policy.policy_name}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {policy.provider_name}
            </p>

            {/* DETAILS */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Coverage</span>
                <span className="text-gray-700 font-medium">
                  ₹{policy.coverage_amount}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Renewal</span>
                <span className="text-gray-700 font-medium">
                  {policy.renewal_date}
                </span>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <button
            onClick={() => navigate("/my-policies")}
            className="mt-4 text-sm font-medium text-indigo-600 hover:underline self-start"
          >
            View all policies →
          </button>
        </>
      ) : (
        <>
          {/* EMPTY STATE */}
          <div className="flex-1">
            <p className="text-sm text-gray-600 mt-2">
              You haven’t added any active policies yet.
            </p>
          </div>

          {/* ACTION */}
          <button
            onClick={() => navigate("/my-policies")}
            className="mt-4 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 w-fit"
          >
            Add your policies
          </button>
        </>
      )}
    </div>
  );
}

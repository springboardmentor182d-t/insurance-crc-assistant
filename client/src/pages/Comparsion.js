import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarMenu } from "../layout/Sidebar";

export function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedPolicies: initialPolicies, from } = location.state || {};
  const [selectedPolicies, setSelectedPolicies] = useState(initialPolicies || []);

  useEffect(() => {
    if (!selectedPolicies || selectedPolicies.length < 2) {
      navigate(from || "/policies");
    }
  }, [selectedPolicies, navigate, from]);

  if (!selectedPolicies || selectedPolicies.length < 2) return null;

  const handleRemovePolicy = (policyId) => {
    const updated = selectedPolicies.filter((p) => p.policy_id !== policyId);
    setSelectedPolicies(updated);

    if (updated.length < 2) {
      navigate(from || "/policies");
    }
  };

  const comparisonKeys = ["Policy", "Premium", "Coverage", "Term", "Deductible"];

  const renderValue = (policy, key) => {
    switch (key) {
      case "Policy":
        return policy.title;
      case "Premium":
        return policy.premium ? `₹${policy.premium}` : "-";
      case "Coverage":
        if (!policy.coverage) return "-";
        return Object.entries(policy.coverage)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
      case "Term":
        return policy.term_months ? `${policy.term_months} months` : "-";
      case "Deductible":
        return policy.deductible ? `₹${policy.deductible}` : "-";
      default:
        return "-";
    }
  };

  return (
    <div className="flex min-h-screen">
     
      <div className="w-[260px]">
        <SidebarMenu />
      </div>
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Compare Policies
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Feature</th>
                {selectedPolicies.map((policy) => (
                  <th
                    key={policy.policy_id}
                    className="px-4 py-3 text-left"
                  >
                    {policy.provider_name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonKeys.map((key) => (
                <tr key={key} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-semibold bg-gray-50">
                    {key}
                  </td>
                  {selectedPolicies.map((policy) => (
                    <td
                      key={policy.policy_id + key}
                      className="px-4 py-3"
                    >
                      {renderValue(policy, key)}
                    </td>
                  ))}
                </tr>
              ))}

         
              <tr>
                <td className="px-4 py-3 font-semibold bg-gray-50">
                  Actions
                </td>
                {selectedPolicies.map((policy) => (
                  <td
                    key={policy.policy_id + "remove"}
                    className="px-4 py-3"
                  >
                    <button
                      onClick={() => handleRemovePolicy(policy.policy_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(from || -1)}
            className="bg-blue-500 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition-colors"
          >
            Back to Catalog
          </button>
        </div>
      </main>
    </div>
  );
}

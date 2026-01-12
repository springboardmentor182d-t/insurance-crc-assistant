// client/src/admin/pages/AdminPolicyCatalog.jsx

import { useState } from "react";
import AdminPolicyCard from "../components/AdminPolicyCard";
import AdminPolicyFilters from "../components/AdminPolicyFilters";
import { adminPolicies } from "../data/adminPolicies";

export default function AdminPolicyCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredPolicies =
    selectedCategory === "ALL"
      ? adminPolicies
      : adminPolicies.filter(
          (policy) => policy.category === selectedCategory
        );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Policy Catalog
        </h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">
          + Create Policy
        </button>
      </div>

      {/* Filters */}
      <AdminPolicyFilters
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Policy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <AdminPolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
}

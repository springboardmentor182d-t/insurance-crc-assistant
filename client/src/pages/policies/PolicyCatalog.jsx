import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PolicyCard from "../../components/policies/PolicyCard";
import PolicyFilters from "../../components/policies/PolicyFilters";
import { getPolicies } from "../../api/policiesApi";
import { useCompare } from "../../context/CompareContext";

export default function PolicyCatalog() {
  const navigate = useNavigate();
  const { selected } = useCompare();

  const [policies, setPolicies] = useState([]);     // ✅ backend data
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPremium, setMaxPremium] = useState(100000);

  /* ===============================
     FETCH POLICIES FROM BACKEND
  =============================== */
  useEffect(() => {
    setLoading(true);
    getPolicies()
      .then((data) => setPolicies(data))
      .finally(() => setLoading(false));
  }, []);

  /* ===============================
     FILTER LOGIC (SAFE)
  =============================== */
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(search.toLowerCase()) ||
      policy.provider.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || policy.category === category;

    const matchesPremium = policy.premium <= maxPremium;

    return matchesSearch && matchesCategory && matchesPremium;
  });

  if (loading) {
    return (
      <div className="p-8 text-slate-500">
        Loading policies...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Policy Catalog
          </h1>
          <p className="text-slate-500 mt-1">
            Browse and compare insurance policies
          </p>
        </div>

        {/* COMPARE BUTTON */}
        <button
          disabled={selected.length < 2}
          onClick={() => navigate("/compare")}
          className={`px-6 py-2 rounded-xl text-white shadow-sm transition
            ${
              selected.length < 2
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          Compare Selected ({selected.length})
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex gap-8 items-start">
        {/* FILTER PANEL */}
        <PolicyFilters
          search={search}
          setSearch={setSearch}
          type={category}          // UI label unchanged
          setType={setCategory}
          maxPremium={maxPremium}
          setMaxPremium={setMaxPremium}
        />

        {/* POLICY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start flex-1">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))
          ) : (
            <p className="text-slate-500">
              No policies match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

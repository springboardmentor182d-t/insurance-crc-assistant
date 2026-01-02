import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import PolicyCard from "../components/PolicyCard";
import { fetchPolicies } from "../services/policyService";

export default function Home() {
  const [policies, setPolicies] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    loadPolicies(activeFilter);
  }, [activeFilter]);

  const loadPolicies = async (type) => {
    try {
      const data = await fetchPolicies(type);
      setPolicies(data);
    } catch (error) {
      console.error("Failed to load policies", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Policy Catalog</h1>
          <p className="text-gray-500">
            Browse and compare insurance policies
          </p>
        </div>

        {/* ✅ JUST NAVIGATES */}
        <button
          onClick={() => navigate("/compare")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Compare Selected
        </button>
      </div>

      <div className="flex gap-6">
        <Filters active={activeFilter} onChange={setActiveFilter} />

        <div className="grid grid-cols-3 gap-6 flex-1">
          {policies.length === 0 ? (
            <p className="text-gray-500">No policies found</p>
          ) : (
            policies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

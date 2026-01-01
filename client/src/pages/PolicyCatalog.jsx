import { Sidebar } from '../layout/Sidebar';
import Header from "../components/Header";
import PolicyFilter from "../features/policies/components/PolicyFilter";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PolicyCatalog = () => {
  const [policies, setPolicies] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [ranges, setRanges] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    range: null,
  });

  useEffect(() => {
    if (!BASE_URL) {
      console.error("❌ BASE_URL is undefined. Check .env file");
      return;
    }

    // Fetch policies
    fetch(`${BASE_URL}/policies`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPolicies(data);
        else setPolicies([]);
      })
      .catch(console.error);

    // Fetch filter data
    fetch(`${BASE_URL}/policies/filters`)
      .then((res) => res.json())
      .then((data) => {
        setPolicyTypes(data.types || []);
        setRanges(data.ranges || []);
      })
      .catch(console.error);
  }, []);

  // Safe filtering
  const filteredPolicies = Array.isArray(policies)
    ? policies.filter((policy) => {
        const matchesSearch =
          policy.title?.toLowerCase().includes(filters.search.toLowerCase());
        const matchesType = !filters.type || policy.policy_type === filters.type;
        const matchesRange =
          !filters.range ||
          (policy.premium >= filters.range.min && policy.premium <= filters.range.max);

        return matchesSearch && matchesType && matchesRange;
      })
    : [];

  return (
    <div className="flex min-h-screen bg-[#0D99FF]">
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        <Header />

        <div className="p-6">
          <PolicyFilter
            filters={filters}
            setFilters={setFilters}
            policyTypes={policyTypes}
            ranges={ranges}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {filteredPolicies.length === 0 && (
              <p className="text-gray-500">No policies found</p>
            )}

            {filteredPolicies.map((policy) => (
              <div key={policy.id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold">{policy.title}</h3>
                <p className="text-gray-500 mt-2">{policy.policy_type}</p>
                <Link
                  to={`/policy-details/${policy.id}`}
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCatalog;

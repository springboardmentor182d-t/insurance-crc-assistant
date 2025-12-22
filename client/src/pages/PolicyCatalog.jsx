import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PolicyCatalog = () => {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/policies")
      .then(res => res.json())
      .then(data => setPolicies(data));
  }, []);

  // 🔹 Browse logic
  const filteredPolicies = policies.filter(policy =>
    policy.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === "" || policy.policy_type === filterType)
  );

  return (
    <>
      <Header />

      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Policy Catalog</h1>

        {/* 🔍 Search & Filter */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search policy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-1/3"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="Health Insurance">Health</option>
            <option value="Life Insurance">Life</option>
            <option value="Travel Insurance">Travel</option>
            <option value="Accident Insurance">Accident</option>
            <option value="Savings Plan">Savings</option>
          </select>
        </div>

        {/* 🧾 Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPolicies.length === 0 && (
            <p>No policies found</p>
          )}

          {filteredPolicies.map(policy => (
            <div
              key={policy.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-lg font-semibold">
                {policy.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {policy.policy_type}
              </p>

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
    </>
  );
};

export default PolicyCatalog;

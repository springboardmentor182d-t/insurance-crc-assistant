import Header from "../components/Header";
import { Link } from "react-router-dom";
import policies from "../features/policies/data/samplePolicies";

const PolicyCatalog = () => {
  return (
    <>
      <Header />

      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Policy Catalog</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-lg font-semibold">
                {policy.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {policy.description}
              </p>

              <Link to={`/policy-details/${policy.id}`}
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

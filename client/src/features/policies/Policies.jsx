import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../components/Header";

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/policies/my-policies")
      .then(res => res.json())
      .then(data => setPolicies(data));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0D99FF]">
      
      <Sidebar />

      
      <div className="flex-1 bg-gray-50">
        <Header />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">My Policies</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policies.map(policy => (
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

                <p className="text-sm text-gray-600 mt-1">
                  Policy No: {policy.policy_number}
                </p>
              </div>
            ))}
          </div>

          {policies.length === 0 && (
            <p>No policies purchased yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;

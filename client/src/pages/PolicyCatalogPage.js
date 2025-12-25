import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PolicyNavbar } from "../layout/Navbar";
import { InfoCard, PolicyCard } from "../layout/PageContainer";
import { SidebarFilter } from "../layout/Sidebar";
import "../index.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export function PolicyCatalogPage() {
  const { policyType } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({ providers: [] });
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [compareList, setCompareList] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [modalPolicy, setModalPolicy] = useState(null);

  const getNumericPremium = (premium) => {
    if (!premium) return 0;
    return Number(String(premium).replace(/[^0-9.]/g, "")) || 0;
  };

  const fetchFilterOptions = useCallback(async () => {
    if (!policyType) return;
    try {
      const res = await fetch(
      `${BASE_URL}/policies/${policyType}/providers`

      );
      const data = await res.json();
      setFilterOptions({ providers: data.providers || [] });
    } catch {
      setFilterOptions({ providers: [] });
    }
  }, [policyType]);

  const fetchPolicies = useCallback(async () => {
    if (!policyType) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/policies/${policyType}`);
      const data = await res.json();
      let fetchedPolicies = data.results || [];

      if (filters.providers?.length > 0) {
        fetchedPolicies = fetchedPolicies.filter((p) =>
          filters.providers.includes(p.provider_name)
        );
      }

      if (filters.duration) {
        fetchedPolicies = fetchedPolicies.filter(
          (p) => p.term_months === filters.duration * 12
        );
      }

      if (filters.premiumRange) {
        fetchedPolicies = fetchedPolicies.filter((p) => {
          const premium = getNumericPremium(p.premium);
          if (filters.premiumRange === "Upto ₹5 Lakh") return premium <= 500000;
          if (filters.premiumRange === "₹5-10 Lakh")
            return premium > 500000 && premium <= 1000000;
          if (filters.premiumRange === "Above ₹10 Lakh") return premium > 1000000;
          return true;
        });
      }

      setPolicies(fetchedPolicies);
    } catch {
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  }, [filters, policyType]);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const handleCompareClick = (policy) => {
    const exists = compareList.find((p) => p.policy_id === policy.policy_id);
    if (exists) {
      setCompareList(compareList.filter((p) => p.policy_id !== policy.policy_id));
      return;
    }
    if (compareList.length >= 3) {
      alert("You can compare at most 3 policies.");
      return;
    }
    setModalPolicy(policy);
  };

  const handleModalConfirm = () => {
    setCompareList([...compareList, modalPolicy]);
    setModalPolicy(null);
    setCompareOpen(true);
  };

  const handleModalCancel = () => setModalPolicy(null);

  const goToComparePage = () => {
    if (compareList.length < 2) {
      alert("Select at least 2 policies to compare.");
      return;
    }
    navigate("/compare", { state: { selectedPolicies: compareList } });
  };

  return (
    <div>
      <PolicyNavbar />
      <InfoCard />

      <div className="flex gap-6 max-w-6xl mx-auto p-6">
        <SidebarFilter
          options={filterOptions}
          onFilterChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
        />

        <div className="flex-1">
          {loading && <p>Loading {policyType} policies...</p>}
          {!loading && policies.length === 0 && (
            <p>No policies found for {policyType}.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.policy_id}
                policy={policy}
                onCompareToggle={handleCompareClick}
                isSelected={!!compareList.find((p) => p.policy_id === policy.policy_id)}
              />
            ))}
          </div>
        </div>
      </div>

     
      {compareList.length > 0 && (
        <div
          className={`fixed bottom-5 right-5 z-50 p-3 rounded-lg shadow-md bg-white transition-all duration-300`}
          style={{ width: compareOpen ? "360px" : "150px" }}
        >
          <div
            className="flex justify-between cursor-pointer font-semibold"
            onClick={() => setCompareOpen(!compareOpen)}
          >
            Compare ({compareList.length}) <span>{compareOpen ? "▼" : "▲"}</span>
          </div>

          {compareOpen && (
            <div className="mt-2 space-y-2">
              {compareList.map((policy) => (
                <div
                  key={policy.policy_id}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <p className="text-sm font-semibold">{policy.title}</p>
               
                  <div className="flex justify-between mt-1">
                    <button
                      onClick={() =>
                        setCompareList(compareList.filter((p) => p.policy_id !== policy.policy_id))
                      }
                      className="text-red-500 text-xs cursor-pointer bg-transparent border-none"
                    >
                      Remove
                    </button>

                    <button
                      disabled
                      className="text-xs px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Selected
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={goToComparePage}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2"
              >
                Compare Now
              </button>
            </div>
          )}
        </div>
      )}

   
      {modalPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-80">
            <p>
              Add <strong>{modalPolicy.title}</strong> from{" "}
              <strong>{modalPolicy.provider_name}</strong> to compare?
            </p>
            <div className="flex justify-between mt-5">
              <button
                onClick={handleModalCancel}
                className="px-3 py-1 rounded border border-gray-300"
              >
                No
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-3 py-1 rounded bg-blue-500 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

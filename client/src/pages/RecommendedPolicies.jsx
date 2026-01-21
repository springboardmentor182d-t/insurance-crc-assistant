import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import api from "../api";
import { useProfile } from "../context/ProfileContext";

export default function RecommendedPolicies() {
  const { profile } = useProfile();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");
  const navigate = useNavigate();

  const userId = profile?.user_id;

useEffect(() => {
  if (!userId) return;

  setLoading(true);

  api
    .get(`/api/recommendations/${userId}`)
    .then((res) => {
      setPolicies(res.data?.recommendations || []);
    })
    .catch((err) => {
      console.error("Recommendations error:", err);
      setPolicies([]);
    })
    .finally(() => setLoading(false));
}, [userId]);


  const sortedPolicies = useMemo(() => {
    const arr = [...policies];

    if (sortType === "premium") {
      return arr.sort((a, b) => a.premium - b.premium);
    }

    if (sortType === "comprehensive") {
      return arr.sort((a, b) => b.premium - a.premium);
    }

    return arr;
  }, [policies, sortType]);

  const getPolicyRoute = (category, id) => {
    const map = {
      Health: "health",
      Life: "life",
      Auto: "motor",
      Home: "home",
      Travel: "travel",
      Fire: "fire",
      Business: "business",
    };

    return `/policies/${map[category]}/${id}`;
  };

  const renderPremium = (policy) => {
    const isTravel = policy.category === "Travel";

    return (
      <p className="text-xl font-semibold mt-2">
        ₹ {policy.premium.toLocaleString("en-IN")}
        <span className="text-sm font-normal text-gray-500">
          {isTravel ? " / year" : " / month"}
        </span>
      </p>
    );
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading recommendations...
      </p>
    );
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">
        Top Picks for Your{" "}
        <span className="text-indigo-600">Profile</span>
      </h1>

      {sortedPolicies.length === 0 && (
        <div className="bg-white border rounded-xl p-6 text-sm text-gray-600">
          No policies match your profile yet.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((policy) => (
          <div
            key={policy.policy_id}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <ShieldCheck size={20} className="text-indigo-600" />
            </div>

            <h3 className="text-lg font-semibold">{policy.name}</h3>
            <p className="text-sm text-gray-500">
              {policy.category} Insurance
            </p>

            {/* ✅ FIXED PREMIUM DISPLAY */}
            {renderPremium(policy)}

            <button
              onClick={() =>
                navigate(
                  getPolicyRoute(policy.category, policy.policy_id)
                )
              }
              className="mt-4 text-sm text-indigo-600 border px-3 py-1 rounded-lg"
            >
              View Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

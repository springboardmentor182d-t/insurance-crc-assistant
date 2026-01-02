import {
  Heart,
  Shield,
  Car,
  Plane,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PolicyCard = ({ policy }) => {
  const navigate = useNavigate();

  const getIconConfig = () => {
    switch (policy.category) {
      case "Health":
        return { Icon: Heart, bg: "#FCE7F3", color: "#DB2777" };
      case "Life":
        return { Icon: Shield, bg: "#EFF6FF", color: "#2563EB" };
      case "Auto":
        return { Icon: Car, bg: "#FEF9C3", color: "#CA8A04" };
      case "Travel":
        return { Icon: Plane, bg: "#ECFDF5", color: "#16A34A" };
      case "Home":
        return { Icon: Home, bg: "#F3E8FF", color: "#7C3AED" };
      default:
        return { Icon: Shield, bg: "#F9FAFB", color: "#374151" };
    }
  };

  const { Icon, bg, color } = getIconConfig();

  // ✅ COMPARE HANDLER
  const handleCompare = () => {
    const existing =
      JSON.parse(localStorage.getItem("comparePolicies")) || [];

    if (!existing.includes(policy.id)) {
      localStorage.setItem(
        "comparePolicies",
        JSON.stringify([...existing, policy.id])
      );
    }

    navigate("/compare");
  };

  return (
    <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: bg }}>
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
        <Icon size={20} color={color} />
      </div>

      <h3 className="text-lg font-semibold">{policy.name}</h3>
      <p className="text-sm text-gray-500">{policy.category} Insurance</p>

      <div className="flex justify-between mt-4 text-sm">
        <div>
          <p className="text-gray-500">Annual Premium</p>
          <p className="font-semibold">₹ {policy.premium}</p>
        </div>
        <div>
          <p className="text-gray-500">Coverage</p>
          <p className="font-semibold">₹ {policy.coverage}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {/* ❌ DO NOT TOUCH */}
        <button
          onClick={() => navigate(`/policies/${policy.id}`)}
          className="border border-blue-600 text-blue-600 py-2 rounded-md w-1/2"
        >
          View Details
        </button>

        {/* ✅ ONLY THIS */}
        <button
          onClick={handleCompare}
          className="bg-blue-600 text-white py-2 rounded-md w-1/2"
        >
          Compare
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;

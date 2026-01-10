import {
  Heart,
  Shield,
  Car,
  Home,
  Plane,
} from "lucide-react";

export function getInsuranceIcon(type) {
  switch (type) {
    case "health":
      return <Heart size={18} className="text-white" />;
    case "life":
      return <Shield size={18} className="text-white" />;
    case "auto":
      return <Car size={18} className="text-white" />;
    case "home":
      return <Home size={18} className="text-white" />;
    case "travel":
      return <Plane size={18} className="text-white" />;
    default:
      return <Shield size={18} className="text-white" />;
  }
}

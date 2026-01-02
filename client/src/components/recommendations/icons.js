import {
  Heart,
  ShieldCheck,
  Car,
  Plane,
  Home,
  Award,
} from "lucide-react";

export function getPolicyIcon(type) {
  switch (type?.toLowerCase()) {
    case "health":
      return <Heart className="text-red-500" />;

    case "life":
      return <ShieldCheck className="text-blue-600" />;

    case "auto":
      return <Car className="text-orange-500" />;

    case "travel":
      return <Plane className="text-purple-500" />;

    case "home":
      return <Home className="text-green-600" />;

    default:
      return <Award className="text-gray-400" />;
  }
}

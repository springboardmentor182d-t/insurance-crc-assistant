import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Car,
  Home,
  Plane,
  Flame,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Health Insurance",
    route: "/health_insurance_rec",
    desc: "Comprehensive medical coverage for you and your family’s well-being.",
    icon: HeartPulse,
    border: "border-pink-400",
    bg: "bg-pink-50",
    accent: "text-pink-600",
    btn: "bg-pink-500",
  },
  {
    title: "Life Insurance",
    route: "/life_insurance_rec",
    desc: "Secure your family’s financial future with reliable life plans.",
    icon: ShieldCheck,
    border: "border-cyan-400",
    bg: "bg-cyan-50",
    accent: "text-cyan-600",
    btn: "bg-cyan-500",
  },
  {
    title: "Auto Insurance",
    route: "/motor_insurance_rec",
    desc: "Reliable protection for your vehicle, passengers, and liability.",
    icon: Car,
    border: "border-indigo-400",
    bg: "bg-indigo-50",
    accent: "text-indigo-600",
    btn: "bg-indigo-500",
  },
  {
    title: "Home Insurance",
    route: "/home_insurance_rec",
    desc: "Coverage for your home, structure, and personal belongings.",
    icon: Home,
    border: "border-yellow-400",
    bg: "bg-yellow-50",
    accent: "text-yellow-700",
    btn: "bg-yellow-500",
  },
  {
    title: "Travel Insurance",
    route: "/travel_insurance_rec",
    desc: "Safety and support for your domestic and international trips.",
    icon: Plane,
    border: "border-green-400",
    bg: "bg-green-50",
    accent: "text-green-600",
    btn: "bg-green-500",
  },
  {
    title: "Fire & Property",
    route: "/fire_property_insurance_rec",
    desc: "Safeguard your assets against fire and natural disasters.",
    icon: Flame,
    border: "border-orange-400",
    bg: "bg-orange-50",
    accent: "text-orange-600",
    btn: "bg-orange-500",
  },
  {
    title: "Business Insurance",
    route: "/business_insurance_rec",
    desc: "Liability, asset, and employee coverage for your company.",
    icon: Building2,
    border: "border-purple-400",
    bg: "bg-purple-50",
    accent: "text-purple-600",
    btn: "bg-purple-500",
  },
];

export default function Recommendations() {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Protection Path
          </span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Select a category below to receive personalized insurance
          recommendations tailored just for you.
        </p>
      </div>

      {/* CTA BUTTON MOVED UP */}
      <div className="mb-14 flex justify-center">
        <button
          onClick={() => navigate("/recommendedPolicies")}
          className="
            flex items-center gap-3
            px-10 py-4
            rounded-2xl
            text-lg font-semibold text-white
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            shadow-lg
            transition-all duration-300
            hover:scale-105 hover:shadow-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-300
          "
        >
          <Sparkles size={22} />
          Show Recommended Policies Based on Your Profile
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`group relative border-2 ${item.border} ${item.bg}
                rounded-2xl p-6 shadow-sm
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5
                  bg-white shadow-sm ${item.accent}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mb-8">{item.desc}</p>

              <button
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center justify-center gap-2 py-2.5
                  rounded-lg text-sm font-semibold text-white
                  ${item.btn}
                  transition-all duration-300
                  hover:opacity-95 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                Start Assessment
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

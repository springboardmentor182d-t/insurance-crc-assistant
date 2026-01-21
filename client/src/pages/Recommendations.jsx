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
    btn: "bg-pink-500 hover:bg-pink-600",
  },
  {
    title: "Life Insurance",
    route: "/life_insurance_rec",
    desc: "Secure your family’s financial future with reliable life plans.",
    icon: ShieldCheck,
    border: "border-cyan-400",
    bg: "bg-cyan-50",
    accent: "text-cyan-600",
    btn: "bg-cyan-500 hover:bg-cyan-600",
  },
  {
    title: "Auto Insurance",
    route: "/motor_insurance_rec",
    desc: "Reliable protection for your vehicle, passengers, and liability.",
    icon: Car,
    border: "border-indigo-400",
    bg: "bg-indigo-50",
    accent: "text-indigo-600",
    btn: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    title: "Home Insurance",
    route: "/home_insurance_rec",
    desc: "Coverage for your home, structure, and personal belongings.",
    icon: Home,
    border: "border-yellow-400",
    bg: "bg-yellow-50",
    accent: "text-yellow-700",
    btn: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    title: "Travel Insurance",
    route: "/travel_insurance_rec",
    desc: "Safety and support for your domestic and international trips.",
    icon: Plane,
    border: "border-green-400",
    bg: "bg-green-50",
    accent: "text-green-600",
    btn: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Fire & Property",
    route: "/fire_property_insurance_rec",
    desc: "Safeguard your assets against fire and natural disasters.",
    icon: Flame,
    border: "border-orange-400",
    bg: "bg-orange-50",
    accent: "text-orange-600",
    btn: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "Business Insurance",
    route: "/business_insurance_rec",
    desc: "Liability, asset, and employee coverage for your company.",
    icon: Building2,
    border: "border-purple-400",
    bg: "bg-purple-50",
    accent: "text-purple-600",
    btn: "bg-purple-500 hover:bg-purple-600",
  },
];

export default function Recommendations() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Protection Path
          </span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Select a category below or view all personalized recommendations based on your profile.
        </p>
      </div>

      {/* CTA */}
      <div className="mb-14">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Get recommendations based on your profile
                </p>
                <p className="text-sm text-gray-600">
                  We’ll analyze your preferences and show the best-matched policies.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/recommendedPolicies")}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                rounded-xl
                text-sm font-semibold
                text-white
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                shadow-md
                hover:shadow-lg hover:scale-[1.02]
                transition-all
              "
            >
              View Recommendations
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`group flex flex-col justify-between border-2 ${item.border} ${item.bg}
                rounded-2xl p-6 shadow-sm
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5
                    bg-white shadow-sm ${item.accent}`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mb-8">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center justify-center gap-2
                  py-3 rounded-xl
                  text-sm font-semibold text-white
                  ${item.btn}
                  transition-all hover:opacity-95`}
              >
                Start Assessment
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

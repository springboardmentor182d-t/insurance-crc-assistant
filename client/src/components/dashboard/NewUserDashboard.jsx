import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import {
  UserCircle,
  Calculator,
  ShieldCheck,
  FileText,
  Star,
} from "lucide-react";

export default function NewUserDashboard() {
  const navigate = useNavigate();
  const { token } = useProfile();

  // 🔐 Extract FULL NAME from JWT
  const getFullNameFromToken = () => {
    if (!token) return "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.full_name || "";
    } catch {
      return "";
    }
  };

  const fullName = getFullNameFromToken();

  return (
    <div
      className="min-h-screen px-10 py-8"
      style={{
        /* ✅ SAME BACKGROUND AS LOGIN / REGISTER */
        background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      }}
    >
      {/* ================= WELCOME (ONE LINE) ================= */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome{fullName ? `, ${fullName}` : ""} 👋
          <span className="block text-base font-normal text-gray-600 mt-2">
            Choose the right insurance plans with confidence, transparency, and smart recommendations.
          </span>
        </h1>
      </div>

      {/* ================= PRIMARY ACTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        <DashboardCard
          icon={<UserCircle className="w-8 h-8 text-indigo-600" />}
          title="Complete Your Profile"
          description="Tell us about yourself so we can tailor insurance recommendations for you."
          buttonText="Go to Profile"
          onClick={() => navigate("/profile")}
          buttonStyle="bg-indigo-600 hover:bg-indigo-700"
        />

        <DashboardCard
          icon={<Calculator className="w-8 h-8 text-purple-600" />}
          title="Premium Calculator"
          description="Estimate insurance premiums instantly based on your needs."
          buttonText="Calculate Premium"
          onClick={() => navigate("/premium-calculator")}
          buttonStyle="bg-purple-600 hover:bg-purple-700"
        />

        <DashboardCard
          icon={<ShieldCheck className="w-8 h-8 text-green-600" />}
          title="Explore Policies"
          description="Browse health, life, motor, travel, and other insurance plans."
          buttonText="View Policies"
          onClick={() => navigate("/catalog")}
          buttonStyle="bg-green-600 hover:bg-green-700"
        />
      </div>

      {/* ================= FEATURES ================= */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-14">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          What you can do here
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<Star className="text-yellow-500" />}
            title="Smart Recommendations"
            text="AI-powered policy suggestions based on your profile."
          />
          <Feature
            icon={<FileText className="text-blue-500" />}
            title="Easy Claims Tracking"
            text="Submit and track insurance claims with full transparency."
          />
          <Feature
            icon={<ShieldCheck className="text-emerald-500" />}
            title="Secure & Reliable"
            text="Your data is protected with industry-grade security."
          />
        </div>
      </div>

      {/* ================= SNAPSHOT ================= */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-lg font-semibold mb-2">Your Insurance Snapshot</h2>
        <p className="text-gray-600 mb-6">
          Once you start using the platform, your activity will appear here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox label="Active Policies" value="0" />
          <StatBox label="Saved Quotes" value="0" />
          <StatBox label="Claims Raised" value="0" />
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function DashboardCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
  buttonStyle,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className={`mt-6 text-white px-4 py-2 rounded-md text-sm font-medium transition ${buttonStyle}`}
      >
        {buttonText}
      </button>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border rounded-xl p-6 text-center bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

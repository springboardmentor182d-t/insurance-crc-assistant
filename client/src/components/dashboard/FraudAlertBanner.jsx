import { AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react";

export default function FraudAlertBanner({ risk }) {
  if (!risk) return null;

  const { high = 0, medium = 0, low = 0 } = risk;

  // ❌ No fraud → no banner
  if (high === 0 && medium === 0 && low === 0) return null;

  // 🔴 HIGH RISK
  if (high > 0) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex justify-between items-center">
        <div className="flex gap-3">
          <AlertTriangle className="text-red-500 mt-1" />
          <div>
            <p className="font-semibold text-red-600">
              High Risk Activity Detected
            </p>
            <p className="text-sm text-red-500">
              {high} high-risk claim{high > 1 ? "s" : ""} require immediate attention.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🟠 MEDIUM RISK
  if (medium > 0) {
    return (
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg flex justify-between items-center">
        <div className="flex gap-3">
          <ShieldAlert className="text-orange-500 mt-1" />
          <div>
            <p className="font-semibold text-orange-600">
              Medium Risk Activity Detected
            </p>
            <p className="text-sm text-orange-500">
              {medium} medium-risk claim{medium > 1 ? "s" : ""} should be reviewed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🟢 LOW RISK
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex justify-between items-center">
      <div className="flex gap-3">
        <CheckCircle className="text-green-500 mt-1" />
        <div>
          <p className="font-semibold text-green-600">
            Low Risk Activity
          </p>
          <p className="text-sm text-green-500">
            {low} low-risk claim{low > 1 ? "s" : ""} detected. No immediate action needed.
          </p>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActionCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* UPDATE PREFERENCES */}
      <div
        onClick={() => navigate("/preferences")}
        className="cursor-pointer bg-white rounded-xl border p-6 flex justify-between items-center hover:shadow-md transition"
      >
        <div>
          <h3 className="font-semibold text-gray-900">
            Update Preferences
          </h3>
          <p className="text-sm text-gray-500">
            Personalize recommendations
          </p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      {/* VIEW CLAIMS */}
      <div
        onClick={() => navigate("/claims")}
        className="cursor-pointer bg-white rounded-xl border p-6 flex justify-between items-center hover:shadow-md transition"
      >
        <div>
          <h3 className="font-semibold text-gray-900">
            View Claims
          </h3>
          <p className="text-sm text-gray-500">
            Track your claim status
          </p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>
    </div>
  );
}

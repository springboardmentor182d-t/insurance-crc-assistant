import { useNavigate } from "react-router-dom";

export default function RecommendedPolicies() {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-[var(--bg-card)]
        border border-[var(--border)]
        rounded-lg p-6
        flex flex-col justify-between h-full
      "
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[var(--accent)] text-lg">⭐</span>
          <h3 className="text-lg font-semibold text-[var(--text-main)]">
            Recommended
          </h3>
        </div>

        <p className="text-sm text-[var(--text-muted)] mb-3">
          Personalized insurance suggestions based on your profile.
        </p>

        {/* BULLETED POINTS */}
        <ul className="list-disc list-inside text-sm text-[var(--text-muted)] space-y-1">
          <li>Coverage gaps identified</li>
          <li>Cost-saving options available</li>
          <li>Policies matched to your profile</li>
        </ul>
      </div>

      {/* CTA BUTTON */}
      <button
        onClick={() => navigate("/recommendedPolicies")}
        className="
          mt-5 w-full
          bg-indigo-600
          text-white
          py-2 rounded-md
          text-sm font-medium
          transition
          hover:opacity-90
        "
      >
        View Recommended Policies →
      </button>
    </div>
  );
}

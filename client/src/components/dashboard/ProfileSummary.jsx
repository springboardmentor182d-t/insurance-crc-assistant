export default function ProfileSummary({ profile }) {
  if (!profile) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-6 text-center">
        <p className="text-[var(--text-muted)] text-sm">
          No profile data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-6 w-full">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profile.photo || "/default-avatar.png"}
            alt={profile.username || "User"}
            className="
              w-24 h-24 rounded-full object-cover
              border-2 border-[var(--accent)]
            "
          />

          <span
            className="
              absolute bottom-0 right-0
              bg-indigo-600
              text-white text-xs
              px-2 py-0.5 rounded-full
            "
          >
            Verified
          </span>
        </div>

        <h2 className="text-xl font-semibold text-[var(--text-main)] mt-3">
          {profile.username || "User"}
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Insurance Profile
        </p>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--text-muted)]">Risk Level</span>
          <span className="font-medium text-[var(--accent)]">
            {profile.risk || "Medium"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[var(--text-muted)]">Annual Budget</span>
          <span className="font-medium text-[var(--text-main)]">
            ₹{profile.monthlyBudget?.toLocaleString() || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[var(--text-muted)]">Family Members</span>
          <span className="font-medium text-[var(--text-main)]">
            {profile.familySize || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[var(--text-muted)]">Insurance Goal</span>
          <span className="font-medium text-[var(--text-main)]">
            {profile.goal || "—"}
          </span>
        </div>

        <div>
          <span className="text-[var(--text-muted)] block mb-1">
            Coverage Interests
          </span>

          <div className="flex flex-wrap gap-2">
            {(profile.categories || []).map((cat) => (
              <span
                key={cat}
                className="
                  px-3 py-1 rounded-full text-xs
                  bg-indigo-300
                  border border-[var(--border)]
                  text-[var(--text-main)]
                "
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

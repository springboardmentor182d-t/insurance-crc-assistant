export default function ProfileSummary({ profile }) {
  if (!profile) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profile.photo || "/default-avatar.png"}
            alt={profile.username || "User"}
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />
          <span className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-3">
          {profile.username || "User"}
        </h2>
        <p className="text-sm text-gray-500">Insurance Profile</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Risk Level</span>
          <span className="font-medium text-indigo-600">
            {profile.risk || "Medium"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Annual Budget</span>
          <span className="font-medium">
            ₹{profile.monthlyBudget?.toLocaleString() || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Family Members</span>
          <span className="font-medium">
            {profile.familySize || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Insurance Goal</span>
          <span className="font-medium">
            {profile.goal || "—"}
          </span>
        </div>

        <div>
          <span className="text-gray-500 block mb-1">
            Coverage Interests
          </span>
          <div className="flex flex-wrap gap-2">
            {(profile.categories || []).map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs"
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

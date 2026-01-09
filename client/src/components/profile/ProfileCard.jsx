import { User, Pencil } from "lucide-react";

export default function ProfileCard({ profile, isEditing, setIsEditing }) {
  // ✅ SAFETY: avoid undefined crash
  if (!profile) return null;

  const name = profile.full_name || "Your Name";
  const email = profile.email || "No email added";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
      <div className="relative flex justify-center">
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <User size={40} />
        </div>
        <span className="absolute bottom-1 right-[38%] w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>

      <h2 className="mt-4 text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{email}</p>

      <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
        ● Active Member
      </span>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        <Pencil size={16} />
        {isEditing ? "Cancel Edit" : "Edit Profile"}
      </button>
    </div>
  );
}

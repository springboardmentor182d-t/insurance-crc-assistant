import { X } from "lucide-react";

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  setProfile,
  onSave,
}) {
  if (!isOpen || !profile) return null;

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="full_name"
            value={profile.full_name || ""}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
          />

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={profile.dob || ""}
            onChange={handleChange}
          />

          <Input
            label="Address"
            name="address"
            value={profile.address || ""}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

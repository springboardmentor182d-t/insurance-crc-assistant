import { Mail, Phone, Calendar, MapPin, User, Save } from "lucide-react";

export default function PersonalInfo({
  profile,
  setProfile,
  isEditing,
  onSave,
}) {
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Personal Information</h2>

        {isEditing && (
          <button
            onClick={onSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Save size={14} /> Save
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          name="full_name"
          value={profile.full_name || ""}
          icon={<User size={16} />}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <Field
          label="Email"
          name="email"
          value={profile.email || ""}
          icon={<Mail size={16} />}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <Field
          label="Phone"
          name="phone"
          value={profile.phone || ""}
          icon={<Phone size={16} />}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <Field
          label="Date of Birth"
          name="dob"
          type="date"
          value={profile.dob || ""}
          icon={<Calendar size={16} />}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <Field
          label="Address"
          name="address"
          value={profile.address || ""}
          icon={<MapPin size={16} />}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  name,
  icon,
  isEditing,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>

      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border">
        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
          {icon}
        </span>

        {!isEditing ? (
          <span className="text-sm font-medium text-gray-900">
            {value || "—"}
          </span>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none text-sm"
          />
        )}
      </div>
    </div>
  );
}

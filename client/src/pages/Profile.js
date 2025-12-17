import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "abc@gmail.com",
    phone: "+91 98765 43210",
    dob: "1990-05-15",
    address: "Mumbai, Maharashtra, India",
  });

  const originalProfile = useRef(profile);

  const handleEdit = () => {
    originalProfile.current = profile;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(originalProfile.current);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated (UI only)");
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl mb-4">
              👤
            </div>

            <h2 className="font-semibold">{profile.fullName}</h2>
            <p className="text-gray-500 text-sm mb-4">{profile.email}</p>

            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg w-full"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="border px-4 py-2 rounded-lg w-full"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* QUICK STATS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Active Policies</span>
                <span className="text-blue-600 font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Claims Filed</span>
                <span className="text-orange-500 font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since</span>
                <span className="text-gray-600">2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* PERSONAL INFORMATION */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                name="fullName"
                value={profile.fullName}
                editable={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Email Address"
                value={profile.email}
                editable={false}
              />
              <Field
                label="Phone Number"
                name="phone"
                value={profile.phone}
                editable={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Date of Birth"
                name="dob"
                type="date"
                value={profile.dob}
                editable={isEditing}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <Field
                label="Address"
                name="address"
                value={profile.address}
                editable={isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCard
              title="Update Preferences"
              desc="Manage your insurance preferences"
              onClick={() => navigate("/preferences")}
            />

            <ActionCard
              title="View Claims"
              desc="Track your claim status"
              onClick={() => navigate("/claims")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Field */
const Field = ({
  label,
  name,
  value,
  editable,
  onChange,
  type = "text",
}) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    {editable ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md"
      />
    ) : (
      <div className="bg-gray-50 px-3 py-2 rounded-md">
        {value}
      </div>
    )}
  </div>
);

/* Action Card */
const ActionCard = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-md transition"
  >
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

export default Profile;

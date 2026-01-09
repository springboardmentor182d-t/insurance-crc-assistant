import { useEffect, useState } from "react";

import ProfileCard from "../components/profile/ProfileCard";
import PersonalInfo from "../components/profile/PersonalInfo";
import QuickStats from "../components/profile/QuickStats";
import ActionCards from "../components/profile/ActionCards";

import { fetchProfile, saveProfile } from "../api/profileApi";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  /* ---------------- SAVE PROFILE ---------------- */
  const handleSave = async () => {
    try {
      const updated = await saveProfile(profile);
      setProfile(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  /* ---------------- STATES ---------------- */
  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="p-6">Profile not found</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          My Profile
        </h1>
        <p className="text-sm text-gray-500">
          Manage your personal information and preferences
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <ProfileCard
            profile={profile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />

          {/* ✅ QUICK STATS */}
          <QuickStats stats={profile.quick_stats} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfo
            profile={profile}
            setProfile={setProfile}
            isEditing={isEditing}
            onSave={handleSave}
          />

          {/* ✅ ACTION CARDS */}
          <ActionCards />
        </div>

      </div>
    </div>
  );
}

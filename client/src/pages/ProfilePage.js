import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import api from "../api";
import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ProfilePage() {
  const { setProfile: setGlobalProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: "",
    avatar: null,
    avatarFile: null,
    dob: "",
    address: "",
    categories: [],
    monthlyBudget: 15000,
    familySize: 1,
    goal: "Family Protection",
    riskLevel: "Medium",
  });

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    api
      .get("/api/profile")
      .then((res) => {
        if (!res.data) return;

        const avatarUrl = res.data.avatar
          ? res.data.avatar.startsWith("http")
            ? res.data.avatar
            : BASE_URL + res.data.avatar
          : null;

        setProfile((prev) => ({
          ...prev,
          name: res.data.name || "",
          dob: res.data.dob ? res.data.dob.slice(0, 10) : "",
          address: res.data.address || "",
          familySize: res.data.familySize || 1,
          categories: res.data.categories || [],
          monthlyBudget: res.data.monthlyBudget || 15000,
          goal: res.data.goal || "Family Protection",
          riskLevel: res.data.riskLevel || "Medium",
          avatar: avatarUrl,
        }));

        // 🔥 update sidebar instantly
        setGlobalProfile({
          ...res.data,
          avatar: avatarUrl,
        });
      })
      .catch((err) => {
        console.error("Profile load error:", err);
      });
  }, [setGlobalProfile]);

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    try {
      const fd = new FormData();

      fd.append("name", profile.name || "");
      if (profile.dob) fd.append("dob", profile.dob);
      fd.append("address", profile.address || "");
      fd.append("family_size", profile.familySize || 1);

      fd.append(
        "preferences",
        JSON.stringify({
          categories: profile.categories || [],
          monthly_budget: profile.monthlyBudget || 15000,
          goal: profile.goal || "Family Protection",
        })
      );

      if (profile.avatarFile) {
        fd.append("avatar", profile.avatarFile);
      }

      await api.post("/api/profile", fd);

      // 🔁 Reload profile to sync sidebar
      const res = await api.get("/api/profile");

      const avatarUrl = res.data.avatar
        ? res.data.avatar.startsWith("http")
          ? res.data.avatar
          : BASE_URL + res.data.avatar
        : null;

      setGlobalProfile({
        ...res.data,
        avatar: avatarUrl,
      });

      alert("Profile saved successfully ✅");
    } catch (err) {
      console.error("SAVE PROFILE FAILED:", err);
      alert("Save failed ❌");
    }
  };

  /* ================= AVATAR ================= */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfile((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(file),
      avatarFile: file,
    }));
  };

  /* ================= CATEGORY TOGGLE ================= */
  const toggleCategory = (cat) => {
    setProfile((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  return (
    <div className="px-6 py-6 max-w-7xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">My Profile</h1>
          <p className="text-sm text-gray-500">
            These details help us recommend the best insurance plans for you.
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg border text-sm"
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-sm mb-6">
              👤 Personal Information
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="text-gray-400" />
                  )}
                </div>
              </label>

              <div>
                <p className="font-medium">{profile.name || "User"}</p>
                <p className="text-sm text-gray-500">
                  Used for recommendations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                placeholder="Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="border rounded-md px-3 py-2"
              />

              <input
                type="date"
                value={profile.dob}
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
                className="border rounded-md px-3 py-2"
              />

              <input
                placeholder="Address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                className="border rounded-md px-3 py-2 md:col-span-2"
              />
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-sm mb-6">
              🛡 Insurance Preferences
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Health", "Life", "Auto", "Home", "Travel", "Fire", "Business"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-1.5 rounded-lg text-sm border ${
                      profile.categories.includes(cat)
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                value={profile.monthlyBudget}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    monthlyBudget: Number(e.target.value),
                  })
                }
                className="border rounded-md px-3 py-2"
              />

              <input
                type="number"
                value={profile.familySize}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    familySize: Number(e.target.value),
                  })
                }
                className="border rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl border p-6">
          <button
            onClick={saveProfile}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

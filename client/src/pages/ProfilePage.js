import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import api from "../api";
import { useProfile } from "../context/ProfileContext";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ProfilePage() {
  const { setProfile: setGlobalProfile } = useProfile();
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
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl space-y-6 bg-[var(--bg-main)] text-[var(--text-main)]">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Profile</h1>

        <button
          onClick={() => {
            const html = document.documentElement;
            const next =
              html.getAttribute("data-theme") === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
          }}
          className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)]"
        >
          🌗 Theme
        </button>
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-8">
        These details help us recommend the best insurance plans for you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PERSONAL INFO */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6">
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
                <p className="font-medium">
                  {profile.name || "Primary Profile"}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Used for recommendations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  👤 Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  📅 Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  📍 Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-sm mb-6">
              🛡 Insurance Preferences
            </h3>

            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">
                🛡 Coverage Interests
              </label>

              <div className="flex flex-wrap gap-2">
                {[
                  "Health",
                  "Life",
                  "Auto",
                  "Home",
                  "Travel",
                  "Fire",
                  "Business",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-1.5 rounded-lg text-sm border ${
                      profile.categories.includes(cat)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-[var(--border)] text-[var(--text-muted)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  💰 Annual Budget
                </label>
                <input
                  type="number"
                  value={profile.monthlyBudget}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      monthlyBudget: Number(e.target.value),
                    })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  👨‍👩‍👧 Family Members
                </label>
                <input
                  type="number"
                  min={1}
                  value={profile.familySize}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      familySize: Number(e.target.value),
                    })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  🎯 Insurance Goal
                </label>
                <select
                  value={profile.goal}
                  onChange={(e) =>
                    setProfile({ ...profile, goal: e.target.value })
                  }
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option>Family Protection</option>
                  <option>Tax Saving</option>
                  <option>Lowest Premium</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  ⚠️ Risk Level
                </label>
                <div className="border rounded-md px-3 py-2 bg-[var(--bg-main)] text-[var(--accent)] font-semibold">
                  {profile.riskLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6 space-y-4">
            <button
              type="button"
              onClick={saveProfile}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700"
            >
              Save Profile
            </button>

            <p className="text-xs text-[var(--text-muted)] text-center">
              Your recommendations update automatically after saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

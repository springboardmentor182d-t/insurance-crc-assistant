import { useState, useEffect } from "react";
import { Calendar, MapPin, Camera } from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    avatar: null,
    dob: "",
    address: "",
    categories: [],
    budget: 15000,
    risk: "Medium",
    familySize: 1,
    goal: "Family Protection",
  });

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    try {
      await axios.post("/api/profile/", {
        dob: profile.dob,
        address: profile.address,
        categories: profile.categories,
        budget: profile.budget,
        risk: profile.risk,
        familySize: profile.familySize,
        goal: profile.goal,
      });

      alert("Profile saved successfully ✅");
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert("Error saving profile ❌");
    }
  };

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    axios
      .get("/api/profile/")
      .then((res) => {
        if (!res.data || Object.keys(res.data).length === 0) return;

        setProfile((prev) => ({
          ...prev,
          dob: res.data.dob || "",
          address: res.data.address || "",
          categories: res.data.categories || [],
          budget: res.data.budget ?? prev.budget,
          risk: res.data.risk || prev.risk,
          familySize: res.data.familySize ?? prev.familySize,
          goal: res.data.goal || prev.goal,
        }));
      })
      .catch(() => console.log("No saved profile yet"));
  }, []);

  /* ================= AVATAR ================= */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfile((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(file),
    }));
  };

  /* ================= CATEGORIES ================= */
  const toggleCategory = (cat) => {
    setProfile((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  return (
    <div className="px-6 py-6 max-w-7xl">
      <h1 className="text-2xl font-semibold mb-2">My Profile</h1>
      <p className="text-sm text-gray-500 mb-8">
        Manage your personal information and insurance preferences.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-sm mb-4">
              Personal Information
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Camera className="text-gray-400" />
                  )}
                </div>
              </label>

              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
                  }
                  className="border rounded-md px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <input
                  type="text"
                  placeholder="Residential Address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="border rounded-md px-2 py-1 w-full"
                />
              </div>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-sm mb-4">
              Insurance Preferences
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Health", "Auto", "Home", "Travel", "Life", "Fire", "Business"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-1.5 rounded-lg text-sm border
                      ${
                        profile.categories.includes(cat)
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-gray-200 text-gray-600"
                      }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <input
                type="number"
                value={profile.budget}
                onChange={(e) =>
                  setProfile({ ...profile, budget: Number(e.target.value) })
                }
                className="border rounded-md px-3 py-2"
              />

              <select
                value={profile.risk}
                onChange={(e) =>
                  setProfile({ ...profile, risk: e.target.value })
                }
                className="border rounded-md px-3 py-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

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
                className="border rounded-md px-3 py-2"
              />

              <select
                value={profile.goal}
                onChange={(e) =>
                  setProfile({ ...profile, goal: e.target.value })
                }
                className="border rounded-md px-3 py-2"
              >
                <option>Family Protection</option>
                <option>Tax Saving</option>
                <option>Lowest Premium</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-xl border p-6">
            <button
              onClick={saveProfile}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

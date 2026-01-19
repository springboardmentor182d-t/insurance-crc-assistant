import { useEffect, useState } from "react";
import {
  getPreferences,
  updatePreferences,
  getRecommendations,
} from "../features/authentication/profile/services/profileApi";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

export default function Preferences() {
  const [prefs, setPrefs] = useState({
    riskTolerance: 50,
    coverageInterests: {
      health: false,
      travel: false,
      home: false,
      life: false,
    },
    premiumRange: {
      min: 0,
      max: 0,
    },
    preferredProviders: {
      globalSure: false,
      trustGuard: false,
      secureLink: false,
      carePro: false,
    },
    communication: {
      email: true,
      sms: false,
    },
    autoClaim: false,
  });

  const [recommendations, setRecommendations] = useState([]);

  // Fetch user preferences on load
  useEffect(() => {
    getPreferences().then((res) => {
      if (res?.data) setPrefs(res.data);
    });
  }, []);

  // Fetch recommendations whenever preferences change
  useEffect(() => {
    if (prefs) {
      getRecommendations().then((res) => {
        if (res?.data) setRecommendations(res.data);
      });
    }
  }, [prefs]);

  // Save preferences
  const handleSave = async () => {
    try {
      await updatePreferences(prefs);
      alert("Preferences saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving preferences");
    }
  };

  return (
    <div className="flex min-h-screen bg-white-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex justify-center py-10 w-full max-w-6xl mx-auto">
          {/* Preferences Card */}
          <div className="bg-white rounded-xl shadow p-8 w-full">
            <h3 className="text-xl font-semibold mb-1">User Preferences</h3>
            <p className="text-sm text-gray-500 mb-8">
              Customize your insurance recommendations and communication
              preferences.
            </p>

            <div className="space-y-10">
              {/* Risk Tolerance */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Risk Tolerance
                </label>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Very Low</span>
                  <span>Moderate</span>
                  <span>Very High</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={prefs.riskTolerance}
                  onChange={(e) =>
                    setPrefs({
                      ...prefs,
                      riskTolerance: Number(e.target.value),
                    })
                  }
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Coverage Interests */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Coverage Interests
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(prefs.coverageInterests).map(
                    ([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setPrefs({
                              ...prefs,
                              coverageInterests: {
                                ...prefs.coverageInterests,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="accent-blue-600"
                        />
                        {key.charAt(0).toUpperCase() + key.slice(1)} Insurance
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Premium Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Preferred Premium Range
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Min Premium"
                    value={prefs.premiumRange.min}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        premiumRange: {
                          ...prefs.premiumRange,
                          min: Number(e.target.value),
                        },
                      })
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max Premium"
                    value={prefs.premiumRange.max}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        premiumRange: {
                          ...prefs.premiumRange,
                          max: Number(e.target.value),
                        },
                      })
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Preferred Providers */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Preferred Providers
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(prefs.preferredProviders).map(
                    ([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setPrefs({
                              ...prefs,
                              preferredProviders: {
                                ...prefs.preferredProviders,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="accent-blue-600"
                        />
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Communication Preferences */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Communication Preferences
                </h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={prefs.communication.email}
                      onChange={(e) =>
                        setPrefs({
                          ...prefs,
                          communication: {
                            ...prefs.communication,
                            email: e.target.checked,
                          },
                        })
                      }
                      className="accent-blue-600"
                    />
                    Email (Updates, recommendations)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={prefs.communication.sms}
                      onChange={(e) =>
                        setPrefs({
                          ...prefs,
                          communication: {
                            ...prefs.communication,
                            sms: e.target.checked,
                          },
                        })
                      }
                      className="accent-blue-600"
                    />
                    SMS (Urgent alerts)
                  </label>
                </div>
              </div>

              {/* Auto Claim */}
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="checkbox"
                  checked={prefs.autoClaim}
                  onChange={(e) =>
                    setPrefs({
                      ...prefs,
                      autoClaim: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Automatic Claim Suggestions
                  </p>
                  <p className="text-xs text-gray-500">
                    We’ll suggest claims automatically when eligible.
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4">
                  Recommended Policies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((policy) => (
                    <div
                      key={policy.id}
                      className={`p-4 rounded-lg shadow ${
                        policy.recommended
                          ? "border-2 border-blue-600"
                          : "border border-gray-200"
                      }`}
                    >
                      <h5 className="font-medium">{policy.title}</h5>
                      <p className="text-sm text-gray-500">
                        Type: {policy.policy_type}
                      </p>
                      <p className="text-sm text-gray-500">
                        Premium: ₹{policy.annual_premium}
                      </p>
                      <p className="text-sm text-gray-500">
                        Score: {policy.final_score.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

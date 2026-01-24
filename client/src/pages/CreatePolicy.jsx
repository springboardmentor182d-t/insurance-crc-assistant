import { useState } from "react";
import { POLICY_FIELDS } from "../config/PolicyFieldConfig";
import { createPolicy } from "../utils/fraudApi";
import { useNavigate } from "react-router-dom";

/* ================= POLICY TYPES ================= */
const policyTypes = [
  "health",
  "life",
  "motor",
  "fire",
  "business",
  "travel",
  "home",
];

/* ================= COLOR MAP ================= */
const policyColors = {
  health: { active: "bg-pink-500 text-white", inactive: "bg-pink-100 text-pink-700" },
  life: { active: "bg-purple-500 text-white", inactive: "bg-purple-100 text-purple-700" },
  motor: { active: "bg-blue-500 text-white", inactive: "bg-blue-100 text-blue-700" },
  fire: { active: "bg-red-500 text-white", inactive: "bg-red-100 text-red-700" },
  business: { active: "bg-emerald-500 text-white", inactive: "bg-emerald-100 text-emerald-700" },
  travel: { active: "bg-orange-500 text-white", inactive: "bg-orange-100 text-orange-700" },
  home: { active: "bg-violet-500 text-white", inactive: "bg-violet-100 text-violet-700" },
};

export default function CreatePolicy() {
  const [policyType, setPolicyType] = useState(null);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ================= BUILD SAFE PAYLOAD ================= */
  const buildPayload = () => {
    const fields = POLICY_FIELDS[policyType];
    const payload = {};

    for (const field of fields) {
      let value = form[field.key];

      // Boolean → default false
      if (field.type === "boolean") {
        payload[field.key] = value === true;
        continue;
      }

      // Number → convert or block
      if (field.type === "number") {
        payload[field.key] =
          value === undefined || value === ""
            ? null
            : Number(value);
        continue;
      }

      // Array (health coverage)
      if (field.type === "array") {
        payload[field.key] =
          typeof value === "string"
            ? value.split(",").map((v) => v.trim())
            : value;
        continue;
      }

      // Status default
      if (field.type === "status") {
        payload[field.key] = value || "active";
        continue;
      }

      payload[field.key] = value ?? null;
    }

    return payload;
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const requiredFields = POLICY_FIELDS[policyType].filter(
      (f) => f.required
    );

    for (const field of requiredFields) {
      if (
        form[field.key] === undefined ||
        form[field.key] === "" ||
        form[field.key] === null
      ) {
        return field.label;
      }
    }
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const missing = validate();
    if (missing) {
      setToast(`${missing} is required`);
      return;
    }

    try {
      const payload = buildPayload();
      await createPolicy(policyType, payload);
      setToast("Policy published successfully");
      setTimeout(() => navigate("/admin/policies"), 1200);
    } catch (err) {
      setToast(
        err?.response?.data?.detail ||
          "Failed to publish policy"
      );
    }
  };

  return (
    <div className="pl-64 min-h-screen">
      <div
        className="min-h-screen p-8"
        style={{
          background:
            "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ffffff 100%)",
        }}
      >
        <h1 className="text-2xl font-semibold mb-6">Create New Policy</h1>

        {/* ================= POLICY TYPE SELECT ================= */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {policyTypes.map((type) => {
            const styles =
              policyType === type
                ? policyColors[type].active
                : policyColors[type].inactive;

            return (
              <button
                key={type}
                onClick={() => {
                  setPolicyType(type);
                  setForm({});
                }}
                className={`min-w-[120px] h-10 px-4 rounded-full text-sm font-semibold transition hover:scale-105 shadow ${styles}`}
              >
                {type.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* ================= FORM ================= */}
        {policyType && (
          <div className="bg-white rounded-2xl shadow-sm border p-6 grid grid-cols-2 gap-6 max-w-5xl">
            {POLICY_FIELDS[policyType].map((field) => {
              if (field.type === "boolean") {
                return (
                  <label
                    key={field.key}
                    className="col-span-2 flex items-center gap-3 text-sm font-medium"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleChange(field.key, e.target.checked)
                      }
                      className="h-4 w-4 text-indigo-600"
                    />
                    {field.label}
                  </label>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={field.key}>
                    <label className="text-xs text-gray-500">
                      {field.label}
                    </label>
                    <select
                      onChange={(e) =>
                        handleChange(field.key, e.target.value)
                      }
                      className="w-full mt-1 px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                <div key={field.key}>
                  <label className="text-xs text-gray-500">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    onChange={(e) =>
                      handleChange(field.key, e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        {policyType && (
          <div className="mt-8 max-w-5xl flex justify-end gap-3">
            <button
              onClick={() => navigate("/admin/policies")}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
            >
              Publish Policy
            </button>
          </div>
        )}

        {/* ================= TOAST ================= */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

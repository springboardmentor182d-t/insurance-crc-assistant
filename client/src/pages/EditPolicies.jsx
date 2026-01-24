import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { POLICY_FIELDS } from "../config/PolicyFieldConfig";
import {
  getPolicyById,
  updatePolicy,
  deletePolicy,
} from "../utils/fraudApi";

export default function EditPolicies() {
  const { policyType, id } = useParams();
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    getPolicyById(policyType, id)
      .then((data) => {
        setPolicy(data);
      })
      .finally(() => setLoading(false));
  }, [policyType, id]);

  const handleChange = (field, value) => {
    setPolicy((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updatePolicy(policyType, id, confirmPayload(policy));
    setToast("Policy updated successfully");
    setTimeout(() => navigate("/admin/policies"), 1200);
  };

  const handleDelete = async () => {
    await deletePolicy(policyType, id);
    setToast("Policy deleted successfully");
    setTimeout(() => navigate("/admin/policies"), 1200);
  };

  if (loading) return <div className="pl-64 p-10">Loading…</div>;
  if (!policy) return <div className="pl-64 p-10 text-red-500">Policy not found</div>;

  return (
    <div className="pl-64 min-h-screen">
      {/* ================= GRADIENT BACKGROUND ================= */}
      <div
        className="min-h-screen px-8 py-6"
        style={{
          background:
            "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ffffff 100%)",
        }}
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Edit {policyType.charAt(0).toUpperCase() + policyType.slice(1)} Policy
        </h1>

        {/* ================= FORM CARD ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-2 gap-6 max-w-5xl">
          {POLICY_FIELDS[policyType]?.map((field) => {
            /* BOOLEAN */
            if (field.type === "boolean") {
              return (
                <label
                  key={field.key}
                  className="col-span-2 flex items-center gap-3 text-sm font-medium text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={!!policy[field.key]}
                    onChange={(e) =>
                      handleChange(field.key, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {field.label}
                </label>
              );
            }

            /* SELECT */
            if (field.type === "select") {
              return (
                <div key={field.key}>
                  <label className="text-xs text-gray-500">
                    {field.label}
                  </label>
                  <select
                    value={policy[field.key] ?? ""}
                    onChange={(e) =>
                      handleChange(field.key, e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
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

            /* DEFAULT INPUT */
            return (
              <div key={field.key}>
                <label className="text-xs text-gray-500">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={policy[field.key] ?? ""}
                  onChange={(e) =>
                    handleChange(field.key, e.target.value)
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            );
          })}
        </div>

        {/* ================= STATUS ================= */}
        <div className="mt-6 flex items-center gap-4">
          <span className="font-medium text-gray-700">Status</span>
          <button
            onClick={() =>
              handleChange(
                "status",
                policy.status === "active" ? "inactive" : "active"
              )
            }
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
              ${
                policy.status === "active"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
          >
            {policy.status}
          </button>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-10 flex justify-between items-center max-w-5xl">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 font-semibold hover:underline"
          >
            Delete Policy
          </button>

          <div className="space-x-3">
            <button
              onClick={() => navigate("/admin/policies")}
              className="px-5 py-2 border border-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* ================= DELETE CONFIRM ================= */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
              <h3 className="font-semibold text-lg mb-2">
                Delete Policy?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Do you really want to delete this policy? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TOAST ================= */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */
function confirmPayload(policy) {
  const cleaned = { ...policy };
  delete cleaned.id;
  delete cleaned.created_at;
  return cleaned;
}

import { useEffect, useState } from "react";
import { getAdminPolicies, deletePolicy } from "../utils/fraudApi";
import { useNavigate } from "react-router-dom";

const filters = [
  { key: "all", label: "All" },
  { key: "health", label: "Health" },
  { key: "life", label: "Life" },
  { key: "motor", label: "Motor" },
  { key: "fire", label: "Fire" },
  { key: "business", label: "Business" },
  { key: "travel", label: "Travel" },
  { key: "home", label: "Home" },
];

const filterStyles = {
  all: { active: "bg-indigo-600 text-white", inactive: "bg-indigo-100 text-indigo-700" },
  health: { active: "bg-pink-500 text-white", inactive: "bg-pink-100 text-pink-700" },
  life: { active: "bg-purple-500 text-white", inactive: "bg-purple-100 text-purple-700" },
  motor: { active: "bg-blue-500 text-white", inactive: "bg-blue-100 text-blue-700" },
  fire: { active: "bg-red-500 text-white", inactive: "bg-red-100 text-red-700" },
  business: { active: "bg-emerald-500 text-white", inactive: "bg-emerald-100 text-emerald-700" },
  travel: { active: "bg-orange-500 text-white", inactive: "bg-orange-100 text-orange-700" },
  home: { active: "bg-violet-500 text-white", inactive: "bg-violet-100 text-violet-700" },
};

export default function AdminPolicyManagement() {
  const [active, setActive] = useState("all");
  const [policies, setPolicies] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const loadPolicies = async () => {
    const data = await getAdminPolicies(active);
    setPolicies(data);
  };

  useEffect(() => {
    loadPolicies();
  }, [active]);

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    await deletePolicy(
      deleteTarget.type.toLowerCase(),
      deleteTarget.id
    );

    setDeleteTarget(null);
    setToast("Policy deleted successfully");
    loadPolicies();

    setTimeout(() => setToast(""), 2000);
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
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Policy Catalog</h1>
            <p className="text-gray-500">Manage all insurance policies</p>
          </div>

          <button
            onClick={() => navigate("/admin/policies/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            Add New Policy
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {filters.map((f) => {
            const styles =
              active === f.key
                ? filterStyles[f.key].active
                : filterStyles[f.key].inactive;

            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`min-w-[110px] h-9 px-4 rounded-full text-sm font-semibold transition hover:scale-[1.03] ${styles}`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-4 text-left">Policy Name</th>
                <th className="p-4 text-center">Type</th>
                <th className="p-4 text-center">Premium</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {policies.map((p) => (
                <tr
                  key={`${p.type}-${p.id}`}
                  className={`border-t text-sm ${
                    p.status === "inactive"
                      ? "bg-gray-50 text-gray-400"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-4 font-medium">{p.policy_name}</td>
                  <td className="p-4 text-center">{p.type}</td>
                  <td className="p-4 text-center">
                    ₹ {p.premium.toLocaleString("en-IN")}
                    <span className="text-xs text-gray-500 ml-1">
                      / {p.premium_frequency === "monthly" ? "month" : "year"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/policies/${p.type.toLowerCase()}/${p.id}/edit`)
                      }
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {policies.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No policies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= DELETE CONFIRM MODAL ================= */}
        {deleteTarget && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
              <h3 className="font-semibold text-lg mb-2">
                Delete Policy?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Do you really want to delete <b>{deleteTarget.policy_name}</b>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 border rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
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

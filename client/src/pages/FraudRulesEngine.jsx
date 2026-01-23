import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAdminApi,
  getFraudRules,
  toggleFraudRule,
  deleteFraudRule,
} from "../utils/fraudApi";
import { Pencil, Trash2 } from "lucide-react";

export default function FraudRulesEngine() {
  const api = useAdminApi(); // ✅ REQUIRED FOR ADMIN AUTH

  const [rules, setRules] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const res = await getFraudRules(api); // ✅ PASS api
      setRules(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed to load fraud rules:", err);
      setRules([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRules = rules.filter((r) => {
    if (filter === "ACTIVE") return r.active;
    if (filter === "INACTIVE") return !r.active;
    return true;
  });

  const stats = {
    active: rules.filter((r) => r.active).length,
    inactive: rules.filter((r) => !r.active).length,
    avgThreshold:
      rules.length > 0
        ? Math.round(
            rules.reduce((sum, r) => sum + r.threshold, 0) / rules.length
          )
        : 0,
  };

  const badge = (severity) => {
    const map = {
      HIGH: "bg-red-100 text-red-700",
      MEDIUM: "bg-yellow-100 text-yellow-700",
      LOW: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${map[severity]}`}
      >
        {severity}
      </span>
    );
  };

  const handleToggle = async (id) => {
    await toggleFraudRule(api, id); // ✅ PASS api
    loadRules();
  };

  const handleDelete = async () => {
    if (!selectedRule) return;

    await deleteFraudRule(api, selectedRule.id); // ✅ PASS api

    setShowDeleteModal(false);
    setSelectedRule(null);
    setShowSuccessModal(true);
    loadRules();
  };

  if (loading) return <div className="p-6">Loading rules...</div>;

  return (
    <div className="pl-64">
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)",
      }}
    >
      <main className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">

        {/* HEADER */}
        <header className="flex items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Fraud Rules Engine
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure detection logic & thresholds
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/fraud-rules/new")}
            className="px-6 py-3 text-sm font-semibold rounded-lg
                       bg-violet-600 text-white hover:bg-violet-700 transition"
          >
            + Create New Rule
          </button>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Active Rules
            </p>
            <p className="text-2xl font-bold text-violet-700 mt-1">
              {stats.active}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Inactive Rules
            </p>
            <p className="text-2xl font-bold text-gray-700 mt-1">
              {stats.inactive}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Avg Threshold
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.avgThreshold}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3">
          {["ALL", "ACTIVE", "INACTIVE"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold
                ${
                  filter === f
                    ? "bg-violet-600 text-white"
                    : "bg-white border hover:bg-gray-50"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left">Rule</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Severity</th>
                <th className="px-6 py-4 text-left">Threshold</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredRules.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{r.rule_name}</td>
                  <td className="px-6 py-4">{r.category}</td>
                  <td className="px-6 py-4">{badge(r.severity)}</td>
                  <td className="px-6 py-4 font-semibold">{r.threshold}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggle(r.id)}
                      className={`px-4 py-1 rounded-full text-xs font-semibold
                        ${
                          r.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {r.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() =>
                          navigate(`/admin/fraud-rules/${r.id}/edit`)
                        }
                        className="text-gray-600 hover:text-violet-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedRule(r);
                          setShowDeleteModal(true);
                        }}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
              <h2 className="text-lg font-bold">Delete Rule</h2>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete{" "}
                <b>{selectedRule?.rule_name}</b>?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
              <h2 className="text-lg font-bold">Rule deleted successfully</h2>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
    </div>
  );
}

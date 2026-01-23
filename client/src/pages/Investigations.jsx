import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import {
  getInvestigations,
  deleteInvestigation,
  updateInvestigation,
  useAdminApi,
} from "../utils/fraudApi";

export default function Investigations() {
  const api = useAdminApi();

  const [data, setData] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadInvestigations();
  }, []);

  const loadInvestigations = async () => {
    const res = await getInvestigations(api);
    setData(res || []);
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    await deleteInvestigation(api, deleteItem.id);
    setDeleteItem(null);
    setSuccess("Investigation deleted successfully");
    loadInvestigations();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    await updateInvestigation(api, editItem.id, {
      priority: editItem.priority,
      notes: editItem.notes,
    });
    setEditItem(null);
    setSuccess("Investigation updated successfully");
    loadInvestigations();
  };

  return (
    <div className="ml-64 min-h-screen bg-violet-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Investigations
            </h1>
            <p className="text-sm text-gray-600">
              All fraud investigations
            </p>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-violet-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3">Claim</th>
                  <th className="px-4 py-3">Policy</th>
                  <th className="px-4 py-3">Policyholder</th>
                  <th className="px-4 py-3">Fraud %</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {data.map((i) => (
                  <tr
                    key={i.id}
                    className="hover:bg-violet-50 transition"
                  >
                    <td className="px-4 py-3 font-semibold">{i.id}</td>
                    <td className="px-4 py-3">#{i.claim_id}</td>
                    <td className="px-4 py-3 font-medium">{i.policy}</td>
                    <td className="px-4 py-3">{i.policyholder}</td>
                    <td className="px-4 py-3 font-bold text-red-600">
                      {i.fraud_score}%
                    </td>
                    <td className="px-4 py-3">{i.priority}</td>
                    <td className="px-4 py-3">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {i.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-4">
                      <Eye
                        onClick={() => setViewItem(i)}
                        className="cursor-pointer text-gray-600 hover:text-violet-600"
                      />
                      <Pencil
                        onClick={() => setEditItem({ ...i })}
                        className="cursor-pointer text-gray-600 hover:text-violet-600"
                      />
                      <Trash2
                        onClick={() => setDeleteItem(i)}
                        className="cursor-pointer text-red-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewItem && (
        <Modal onClose={() => setViewItem(null)}>
          <h2 className="text-xl font-bold mb-4 text-violet-700">
            Investigation #{viewItem.id}
          </h2>

          <Detail label="Claim ID" value={`#${viewItem.claim_id}`} />
          <Detail label="Policy" value={viewItem.policy} />
          <Detail label="Policyholder" value={viewItem.policyholder} />
          <Detail label="Fraud Score" value={`${viewItem.fraud_score}%`} red />
          <Detail label="Priority" value={viewItem.priority} />
          <Detail label="Status" value={viewItem.status} />
          <Detail label="Notes" value={viewItem.notes || "—"} />

          <button
            onClick={() => setViewItem(null)}
            className="mt-6 w-full bg-violet-600 text-white py-2 rounded-lg font-semibold"
          >
            Close
          </button>
        </Modal>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <h2 className="text-xl font-bold mb-4 text-violet-700">
            Edit Investigation #{editItem.id}
          </h2>

          <label className="block text-sm font-semibold mb-2">Priority</label>
          <select
            value={editItem.priority}
            onChange={(e) =>
              setEditItem({ ...editItem, priority: e.target.value })
            }
            className="w-full mb-4 border rounded-lg px-3 py-2"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <label className="block text-sm font-semibold mb-2">Notes</label>
          <textarea
            rows={4}
            value={editItem.notes || ""}
            onChange={(e) =>
              setEditItem({ ...editItem, notes: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            onClick={handleUpdate}
            className="mt-4 w-full bg-violet-600 text-white py-2 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteItem && (
        <Modal onClose={() => setDeleteItem(null)}>
          <h2 className="text-lg font-bold text-red-600 mb-3">
            Reject & Delete
          </h2>
          <p className="text-sm mb-6">
            Reject the claim and delete this investigation permanently?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteItem(null)}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white"
            >
              Yes, Delete
            </button>
          </div>
        </Modal>
      )}

      {/* ================= SUCCESS MODAL ================= */}
      {success && (
        <Modal onClose={() => setSuccess("")}>
          <p className="text-green-600 font-semibold mb-4 text-center">
            {success}
          </p>
          <button
            onClick={() => setSuccess("")}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            OK
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ================= HELPERS ================= */

function Detail({ label, value, red }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-500">{label}</span>
      <span className={red ? "text-red-600 font-bold" : ""}>{value}</span>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

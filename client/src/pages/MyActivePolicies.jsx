import { useEffect, useState } from "react";
import { Plus, ShieldCheck, X , Pencil, Trash2, Eye } from "lucide-react";
import { fetchPolicies, addPolicy, updatePolicy, deletePolicy } from "../api";

export default function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const [form, setForm] = useState({
    policy_name: "",
    policy_type: "",
    provider_name: "",
    policy_number: "",
    start_date: "",
    end_date: "",
    renewal_date: "",
    premium_amount: "",
    payment_frequency: "yearly",
    next_due_date: "",
    coverage_amount: "",
    auto_debit: false,
  });

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    const res = await fetchPolicies();
    setPolicies(res.data);
  };
  // ✅ ADD THIS FUNCTION (THIS IS MISSING)
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
  const handleEdit = (policy) => {
  setEditingPolicyId(policy.id);
  setViewOnly(false);
  setForm({
    policy_name: policy.policy_name,
    policy_type: policy.policy_type,
    provider_name: policy.provider_name,
    policy_number: policy.policy_number,
    start_date: policy.start_date,
    end_date: policy.end_date,
    renewal_date: policy.renewal_date,
    premium_amount: policy.premium_amount,
    payment_frequency: policy.payment_frequency,
    next_due_date: policy.next_due_date || "",
    coverage_amount: policy.coverage_amount,
    auto_debit: policy.auto_debit,
  });
  setOpen(true);
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this policy?")) return;
  await deletePolicy(id);
  loadPolicies();
};

    const handleView = (policy) => {
  setEditingPolicyId(null); // not editing
  setViewOnly(true);

  setForm({
    policy_name: policy.policy_name,
    policy_type: policy.policy_type,
    provider_name: policy.provider_name,
    policy_number: policy.policy_number,
    start_date: policy.start_date,
    end_date: policy.end_date,
    renewal_date: policy.renewal_date,
    premium_amount: policy.premium_amount,
    payment_frequency: policy.payment_frequency,
    next_due_date: policy.next_due_date || "",
    coverage_amount: policy.coverage_amount,
    auto_debit: policy.auto_debit,
  });

  setOpen(true);
};

  const handleSubmit = async () => {
  const payload = {
    policy_name: form.policy_name,
    policy_type: form.policy_type,
    provider_name: form.provider_name,
    policy_number: form.policy_number,

    start_date: form.start_date,
    end_date: form.end_date,
    renewal_date: form.renewal_date,

    premium_amount: Number(form.premium_amount),
    payment_frequency: form.payment_frequency,

    coverage_amount: Number(form.coverage_amount),
    auto_debit: form.auto_debit,
  };

  if (form.next_due_date) {
    payload.next_due_date = form.next_due_date;
  }

  // 🔴 THIS IS THE MAIN FIX
  if (editingPolicyId) {
    await updatePolicy(editingPolicyId, payload); // EDIT
  } else {
    await addPolicy(payload); // ADD
  }

  setEditingPolicyId(null); // reset edit mode
  setOpen(false);
  loadPolicies();
};





  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Policies
          </h1>
          <p className="text-sm text-gray-500">
            Manage all your active insurance policies
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2
                     bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Policy
        </button>
      </div>

      {/* POLICIES LIST */}
      {policies.length === 0 ? (
  <div className="bg-white rounded-xl border p-10 text-center">
    <ShieldCheck size={40} className="mx-auto text-indigo-500 mb-3" />
    <p className="font-medium text-gray-700">
      No policies added yet
    </p>
    <p className="text-sm text-gray-500">
      Add your existing insurance policies to track them here
    </p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {policies.map((policy) => (
      <div
        key={policy.id}
        className="bg-white rounded-xl border p-5 space-y-3"
      >
        {/* 🔹 HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold">
              {policy.policy_name}
            </p>
            <p className="text-sm text-gray-500">
              {policy.provider_name}
            </p>
          </div>

          {/* ✅ EDIT / DELETE ICONS */}
          <div className="flex items-center gap-2">
  <Eye
    size={16}
    className="cursor-pointer text-gray-500 hover:text-indigo-600"
    onClick={() => handleView(policy)}
  />
  <Pencil
    size={16}
    className="cursor-pointer text-gray-500 hover:text-indigo-600"
    onClick={() => handleEdit(policy)}
  />
  <Trash2
    size={16}
    className="cursor-pointer text-gray-500 hover:text-red-600"
    onClick={() => handleDelete(policy.id)}
  />
</div>

        </div>

        {/* 🔹 DETAILS */}
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <p className="text-gray-500">Coverage</p>
          <p className="font-medium">₹{policy.coverage_amount}</p>

          <p className="text-gray-500">Premium</p>
          <p className="font-medium">
            ₹{policy.premium_amount} / {policy.payment_frequency}
          </p>

          <p className="text-gray-500">Renewal Date</p>
          <p className="font-medium">{policy.renewal_date}</p>
        </div>
      </div>
    ))}
  </div>
)}

      {/* ADD POLICY MODAL */}
      {open && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-2xl p-6 space-y-6">
      
      {/* MODAL HEADER */}
      <div className="flex justify-between items-center border-b pb-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {viewOnly
                ? "View Policy"
                : editingPolicyId
                ? "Edit Policy"
                : "Add New Policy"}
            </h2>
          <p className="text-sm text-gray-500">
            Enter details of your existing insurance policy
          </p>
        </div>
        <X
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* POLICY DETAILS */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">
          Policy Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="policy_name"
            placeholder="Policy Name"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.policy_name}
            disabled={viewOnly}
          />

          <select
            name="policy_type"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.policy_type}
            disabled={viewOnly}
          >
            <option value="">Policy Type</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="motor">Motor</option>
            <option value="home">Home</option>
            <option value="travel">Travel</option>
            <option value="business">Business</option>
            <option value="fire">Fire</option>
          </select>

          <input
            name="provider_name"
            placeholder="Provider Name"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.provider_name}
            disabled={viewOnly}
          />

          <input
            name="policy_number"
            placeholder="Policy Number"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.policy_number}
            disabled={viewOnly}
          />
        </div>
      </div>

      {/* COVERAGE & PREMIUM */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">
          Coverage & Premium
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="coverage_amount"
            placeholder="Coverage Amount"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.coverage_amount}
            disabled={viewOnly}
          />

          <input
            name="premium_amount"
            placeholder="Premium Amount"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.premium_amount}
            disabled={viewOnly}
          />

          <select
            name="payment_frequency"
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            value={form.payment_frequency}
            disabled={viewOnly}
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      {/* DATES */}
      {/* IMPORTANT DATES */}
<div className="space-y-3">
  <h3 className="text-sm font-semibold text-gray-700 uppercase">
    Important Dates
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div className="space-y-1">
      <label className="text-xs text-gray-500">
        Policy Start Date
      </label>
      <input
        type="date"
        name="start_date"
        className="border rounded-lg px-3 py-2 text-sm w-full"
        onChange={handleChange}
        value={form.start_date}
        disabled={viewOnly}
      />
    </div>

    <div className="space-y-1">
      <label className="text-xs text-gray-500">
        Policy End Date
      </label>
      <input
        type="date"
        name="end_date"
        className="border rounded-lg px-3 py-2 text-sm w-full"
        onChange={handleChange}
        value={form.end_date}
        disabled={viewOnly}
      />
    </div>

    <div className="space-y-1">
      <label className="text-xs text-gray-500">
        Renewal Date
      </label>
      <input
        type="date"
        name="renewal_date"
        className="border rounded-lg px-3 py-2 text-sm w-full"
        onChange={handleChange}
        value={form.renewal_date}
        disabled={viewOnly}
      />
    </div>

    <div className="space-y-1">
      <label className="text-xs text-gray-500">
        Next Premium Due Date
      </label>
      <input
        type="date"
        name="next_due_date"
        className="border rounded-lg px-3 py-2 text-sm w-full"
        onChange={handleChange}
        value={form.next_due_date}
        disabled={viewOnly}
      />
    </div>

  </div>
</div>


      {/* AUTO DEBIT */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="auto_debit"
          onChange={handleChange}
          value={form.auto_debit}
            disabled={viewOnly}
        />
        Auto Debit Enabled
      </label>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm rounded-lg
                     bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Save Policy
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
} 
// client/src/admin/components/CreatePolicyModal.jsx
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CreatePolicyModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    category: "AUTO",
    price: "",
    status: "DRAFT",
    recommended: false,
    features: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...form,
      price: Number(form.price),
      features: form.features.split(",").map((f) => f.trim()),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create Policy</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Policy Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="AUTO">Auto</option>
            <option value="HEALTH">Health</option>
            <option value="HOME">Home</option>
            <option value="LIFE">Life</option>
            <option value="TRAVEL">Travel</option>
            <option value="BUSINESS">Business</option>
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <textarea
            name="features"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="recommended"
              checked={form.recommended}
              onChange={handleChange}
            />
            <label>Recommended</label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

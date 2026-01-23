import React from "react";

const PolicyFilter = ({ categories = [], selected, onChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <label className="block mb-2 font-semibold">
        Filter by Category
      </label>

      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">All</option>

        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PolicyFilter;

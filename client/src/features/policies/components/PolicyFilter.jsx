const PolicyFilter = ({ filters, setFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex gap-4">
      
      {/* Policy Type */}
      <select
        className="border border-gray-200 rounded px-4 py-2 text-sm"
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="">Policy Type</option>
        <option value="health">Health</option>
        <option value="auto">Auto</option>
        <option value="travel">Travel</option>
      </select>

      {/* Premium Range */}
      <select
        className="border border-gray-200 rounded px-4 py-2 text-sm"
        value={filters.premium}
        onChange={(e) =>
          setFilters({ ...filters, premium: e.target.value })
        }
      >
        <option value="">Premium Range</option>
        <option value="low">Below ₹500</option>
        <option value="mid">₹500 – ₹700</option>
        <option value="high">Above ₹700</option>
      </select>

    </div>
  );
};

export default PolicyFilter;

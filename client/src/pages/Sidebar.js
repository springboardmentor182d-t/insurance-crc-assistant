import React, { useState } from 'react';

const Sidebar = ({ filterType, setFilterType }) => {
  const [premiumRange, setPremiumRange] = useState(50000);

  const filterTypes = [
    { emoji: '❤️', label: 'Health', type: 'health' },
    { emoji: '🛡️', label: 'Life', type: 'life' },
    { emoji: '🚗', label: 'Auto', type: 'auto' },
    { emoji: '✈️', label: 'Travel', type: 'travel' },
    { emoji: '🏠', label: 'Home', type: 'home' }
  ];

  return (
    <aside className="sidebar">
      <div className="filters-section">
        <h3>Filters</h3>

        <input
          type="text"
          className="search-box"
          placeholder="Search policies..."
        />

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          {filterTypes.map(({ emoji, label, type }) => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="premium-slider">
          <div className="slider-label">Premium Range: ₹0 - ₹1,00,000</div>
          <input
            type="range"
            min="0"
            max="100000"
            value={premiumRange}
            onChange={(e) => setPremiumRange(Number(e.target.value))}
          />
          <div
            style={{
              textAlign: 'center',
              marginTop: 8,
              fontSize: 14,
              color: '#64748b'
            }}
          >
            Up to ₹{premiumRange.toLocaleString()}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

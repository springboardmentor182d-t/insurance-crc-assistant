import React from 'react';

const ComparePolicies = ({ selectedPolicies }) => {
  const left = selectedPolicies[0] || {
    name: 'Health Shield Pro',
    premium: 15000,
    coverage: '₹5,00,000'
  };
  const right = selectedPolicies[1] || {
    name: 'Life Protect Plus',
    premium: 25000,
    coverage: '₹20,00,000'
  };

  const rows = [
    {
      label: 'Annual Premium',
      values: [`₹${left.premium.toLocaleString()}`, `₹${right.premium.toLocaleString()}`],
      bestIndex: left.premium <= right.premium ? 0 : 1
    },
    {
      label: 'Sum Insured',
      values: [left.coverage, right.coverage],
      bestIndex: 1
    },
    {
      label: 'Cashless Hospitals',
      values: ['5000+', '3000+'],
      bestIndex: 0
    },
    {
      label: 'Waiting Period',
      values: ['30 Days', '60 Days'],
      bestIndex: 0
    },
    {
      label: 'Pre-existing Coverage',
      values: ['After 3 Years', 'After 4 Years'],
      bestIndex: 0
    },
    {
      label: 'Claim Settlement',
      values: ['95%', '90%'],
      bestIndex: 0
    },
    {
      label: 'Room Rent Limit',
      values: ['No Limit', '1% of SI'],
      bestIndex: 0
    },
    {
      label: 'Day-care Procedures',
      values: ['✔', '✔'],
      bestIndex: 0
    },
    {
      label: 'Ambulance Cover',
      values: ['✔', '✔'],
      bestIndex: 0
    },
    {
      label: 'Health Check-up',
      values: ['Included', 'Not Included'],
      bestIndex: 0
    }
  ];

  return (
    <div>
      <div className="compare-header">
        <div>
          <h1 className="page-title">Compare Policies</h1>
          <p className="subtitle">
            Side‑by‑side comparison of selected policies
          </p>
        </div>
        <button className="btn btn-secondary">Add More</button>
      </div>

      <div className="selected-policies">
        <div className="policy-mini-card">
          <div style={{ fontSize: 14, color: '#64748b' }}>Policy 1</div>
          <div style={{ fontWeight: 600 }}>{left.name}</div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#059669'
            }}
          >
            ₹{left.premium.toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{left.coverage}</div>
          <button className="btn btn-primary">Buy Now</button>
        </div>

        <div className="policy-mini-card">
          <div style={{ fontSize: 14, color: '#64748b' }}>Policy 2</div>
          <div style={{ fontWeight: 600 }}>{right.name}</div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#059669'
            }}
          >
            ₹{right.premium.toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{right.coverage}</div>
          <button className="btn btn-primary">Buy Now</button>
        </div>

        <div
          className="policy-mini-card"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>
            Add policy to compare
          </div>
          <button className="btn btn-secondary">Browse Policies</button>
        </div>
      </div>

      <div className="compare-table">
        <div className="table-header">Policy comparison details</div>
        <div className="table-grid">
          {rows.map((row, idx) => (
            <div key={idx} className="table-row">
              <div className="table-cell table-label">{row.label}</div>
              {row.values.map((value, colIdx) => (
                <div
                  key={colIdx}
                  className={`table-cell table-value ${
                    row.bestIndex === colIdx ? 'best-value' : ''
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparePolicies;

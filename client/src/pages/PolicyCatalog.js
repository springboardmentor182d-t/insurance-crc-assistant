import React from 'react';

const policies = [
  {
    id: 1,
    name: 'Health Shield Pro',
    provider: 'SecureLife Insurance',
    premium: 15000,
    coverage: '₹5,00,000',
    type: 'health'
  },
  {
    id: 2,
    name: 'Life Protect Plus',
    provider: 'Guardian Insurance',
    premium: 25000,
    coverage: '₹20,00,000',
    type: 'life'
  },
  {
    id: 3,
    name: 'Auto Guard Complete',
    provider: 'DriveSecure Insurance',
    premium: 12000,
    coverage: '₹3,00,000',
    type: 'auto'
  },
  {
    id: 4,
    name: 'Travel Safe International',
    provider: 'Wanderlust Insurance',
    premium: 5000,
    coverage: '₹1,00,000',
    type: 'travel'
  },
  {
    id: 5,
    name: 'Home Protection Elite',
    provider: 'SafeNest Insurance',
    premium: 18000,
    coverage: '₹10,00,000',
    type: 'home'
  },
  {
    id: 6,
    name: 'Health Care Essential',
    provider: 'MediGuard',
    premium: 10000,
    coverage: '₹3,00,000',
    type: 'health'
  }
];

const iconForType = (type) => {
  switch (type) {
    case 'health':
      return '❤️';
    case 'life':
      return '🛡️';
    case 'auto':
      return '🚗';
    case 'travel':
      return '✈️';
    case 'home':
      return '🏠';
    default:
      return '📄';
  }
};

const PolicyCatalog = ({
  selectedPolicies,
  setSelectedPolicies,
  setCurrentPage,
  filterType
}) => {
  const visiblePolicies =
    filterType === 'all'
      ? policies
      : policies.filter((p) => p.type === filterType);

  const toggleCompare = (policy) => {
    const exists = selectedPolicies.some((p) => p.id === policy.id);
    if (exists) {
      setSelectedPolicies(selectedPolicies.filter((p) => p.id !== policy.id));
    } else {
      setSelectedPolicies([...selectedPolicies, policy]);
    }
  };

  return (
    <div>
      <h1 className="page-title">Policy Catalog</h1>
      <p className="subtitle">Browse and compare insurance policies</p>

      {selectedPolicies.length > 0 && (
        <div
          style={{
            marginBottom: 24,
            padding: 14,
            background: '#eff6ff',
            borderRadius: 12,
            border: '1px solid #3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 520
          }}
        >
          <span style={{ fontSize: 14 }}>
            {selectedPolicies.length} policies selected for comparison
          </span>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage('compare')}
          >
            Compare Selected
          </button>
        </div>
      )}

      <div className="policy-grid">
        {visiblePolicies.map((policy) => (
          <div
            key={policy.id}
            className={`policy-card policy-card-${policy.type}`}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16
              }}
            >
              <div className="policy-icon">{iconForType(policy.type)}</div>
              <div style={{ flex: 1 }}>
                <div className="policy-header">
                  <h3>{policy.name}</h3>
                  <div className="provider">{policy.provider}</div>
                </div>
              </div>
            </div>

            <div className="premium">₹{policy.premium.toLocaleString()}</div>
            <div className="coverage">Coverage: {policy.coverage}</div>

            <div className="card-actions">
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => setCurrentPage('details')}
              >
                View Details
              </button>
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => toggleCompare(policy)}
              >
                {selectedPolicies.some((p) => p.id === policy.id)
                  ? 'Added'
                  : 'Compare'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyCatalog;

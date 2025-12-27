import React from 'react';

const PolicyDetails = ({ setCurrentPage }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          marginBottom: 24
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage('catalog')}
        >
          ← Back
        </button>
        <div>
          <h1 className="page-title">Health Shield Pro</h1>
          <p className="subtitle">SecureLife Insurance</p>
        </div>
      </div>

      <div className="details-layout">
        {/* LEFT COLUMN */}
        <div className="overview-card">
          <h3 style={{ marginBottom: 16, fontSize: 18 }}>Coverage Details</h3>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Policy Term</div>
              <div className="detail-value">1 Year (Renewable)</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Waiting Period</div>
              <div className="detail-value">30 Days</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Room Rent Limit</div>
              <div className="detail-value">No Limit</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Deductible</div>
              <div className="detail-value">₹25,000</div>
            </div>
          </div>

          <h3 style={{ margin: '16px 0', fontSize: 18 }}>Benefits Included</h3>
          <div className="benefits-list" style={{ marginBottom: 16 }}>
            <div className="benefit-item">
              <div className="benefit-dot" />
              <span>Cashless hospitalization at 5000+ network hospitals</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-dot" />
              <span>Coverage for pre‑existing diseases after 3 years</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-dot" />
              <span>Annual health check‑up included</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-dot" />
              <span>No claim bonus up to 50%</span>
            </div>
          </div>

          <h3 style={{ margin: '16px 0', fontSize: 18 }}>Exclusions</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <div
                className="benefit-dot"
                style={{ background: '#EF4444' }}
              />
              <span>Cosmetic and aesthetic treatments</span>
            </div>
            <div className="benefit-item">
              <div
                className="benefit-dot"
                style={{ background: '#EF4444' }}
              />
              <span>Self‑inflicted injuries and substance abuse</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="overview-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 24
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  Annual Premium
                </div>
                <div
                  style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}
                >
                  ₹15,000
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  Sum Insured
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}
                >
                  ₹5,00,000
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>
                Buy Now
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                Add to Compare
              </button>
            </div>

            <div className="policy-score-section">
              <div>
                <div className="score-circle">
                  <span>8.5</span>
                </div>
                <div className="score-label">Policy Score</div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#16a34a',
                    textAlign: 'center',
                    marginTop: 4
                  }}
                >
                  Highly Recommended
                </div>
              </div>
              <div className="rating-section">
                <div className="rating-score">95%</div>
                <div className="rating-label">Claim Settlement</div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#64748b',
                    marginTop: 4
                  }}
                >
                  Customer Rating 4.5 / 5
                </div>
              </div>
            </div>
          </div>

          <div className="special-offer">
            <h4 style={{ marginBottom: 8 }}>Special Offer</h4>
            <p style={{ fontSize: 14, marginBottom: 16 }}>
              Get 10% discount on annual premium for online purchase of Health
              Shield Pro.
            </p>
            <button
              className="btn"
              style={{
                background: 'white',
                color: '#4f46e5',
                fontWeight: 600,
                padding: '10px 20px'
              }}
            >
              Claim Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;

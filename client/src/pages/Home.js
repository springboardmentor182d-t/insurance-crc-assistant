import React from 'react';

const Home = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '700', letterSpacing: '-0.02em' }}>Insurance Overview</h1>
        <p style={{ color: '#64748B', marginTop: '4px' }}>Welcome back, here's what's happening with your policies.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Policies</div>
          <div className="stat-value">12</div>
          <div style={{ marginTop: '12px' }}>
            <span className="badge-blue">↑ 2.5% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Premium</div>
          <div className="stat-value">$4,200</div>
          <div style={{ marginTop: '12px' }}>
            <span className="badge-blue">Next payment in 5 days</span>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #2563EB' }}>
          <div className="stat-label">Pending Claims</div>
          <div className="stat-value">02</div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600' }}>Requires attention</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
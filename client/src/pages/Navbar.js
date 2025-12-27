import React from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { label: 'Policies', page: 'catalog' },
    { label: 'Compare', page: 'compare' },
    'Recommendations',
    'Claims',
    'Admin',
    'Fraud Detection',
    'Settings'
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        🛡️ <span>InsureHub</span>
      </div>
      <ul className="nav-menu">
        {navItems.map((item, idx) => {
          if (typeof item === 'string') {
            return (
              <li key={idx} className="nav-item">
                {item}
              </li>
            );
          }
          return (
            <li
              key={item.page}
              className={`nav-item ${
                currentPage === item.page ? 'active' : ''
              }`}
              onClick={() => setCurrentPage(item.page)}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
      <div className="user-dropdown">
        <span>Admin User</span> <span>▼</span>
      </div>
    </nav>
  );
};

export default Navbar;

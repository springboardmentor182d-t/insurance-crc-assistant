import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, BarChart2, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'My Policies', icon: <FileText size={20} />, path: '/my-policies' },
    { name: 'Comparison', icon: <BarChart2 size={20} />, path: '/compare' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={{ padding: '20px' }}>
        <p style={labelStyle}>MENU</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => (isActive ? activeItem : navItem)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div style={supportCard}>
        <div style={iconCircle}><HelpCircle size={18} color="#2563EB" /></div>
        <p style={{ fontWeight: '700', fontSize: '13px', margin: '10px 0 5px' }}>Support Center</p>
        <p style={{ fontSize: '11px', color: '#64748B', margin: 0 }}>Need help with a policy?</p>
      </div>
    </div>
  );
};

// --- STYLES ---
const sidebarStyle = {
  width: '260px',
  backgroundColor: '#FFFFFF',
  borderRight: '1px solid #E2E8F0',
  height: 'calc(100vh - 80px)',
  position: 'sticky',
  top: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: '30px'
};

const labelStyle = { fontSize: '11px', fontWeight: '800', color: '#94A3B8', letterSpacing: '1px', marginBottom: '20px', paddingLeft: '12px' };

const navItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  textDecoration: 'none',
  color: '#64748B',
  fontWeight: '600',
  fontSize: '14px',
  borderRadius: '12px',
  transition: '0.2s'
};

const activeItem = {
  ...navItem,
  backgroundColor: '#EFF6FF',
  color: '#2563EB',
};

const supportCard = {
  margin: '0 20px',
  padding: '20px',
  backgroundColor: '#F8FAFC',
  borderRadius: '16px',
  border: '1px solid #F1F5F9',
  textAlign: 'center'
};

const iconCircle = {
  width: '32px',
  height: '32px',
  backgroundColor: '#FFFFFF',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

export default Sidebar;
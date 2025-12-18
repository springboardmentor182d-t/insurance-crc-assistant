import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={logoIconBox}>
          <ShieldCheck size={24} color="white" />
        </div>
        <Link to="/" style={brandText}>InsureHub</Link>
      </div>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={navLink}>Explore</Link>
        <Link to="/compare" style={navLink}>Comparison</Link>
        <div style={avatar}>👤</div>
      </div>
    </nav>
  );
};

const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 60px', height: '80px', backgroundColor: '#FFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 1000 };
const logoIconBox = { backgroundColor: '#2563EB', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const brandText = { textDecoration: 'none', color: '#0F172A', fontWeight: '800', fontSize: '1.6rem' };
const navLink = { textDecoration: 'none', color: '#64748B', fontWeight: '600' };
const avatar = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #E2E8F0' };

export default Navbar;
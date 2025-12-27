import React, { useState } from 'react';
import Navbar from './pages/Navbar';
import Sidebar from './pages/Sidebar';
import PolicyCatalog from './pages/PolicyCatalog';
import PolicyDetails from './pages/PolicyDetails';
import ComparePolicies from './pages/ComparePolicies';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('catalog');
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Sidebar filterType={filterType} setFilterType={setFilterType} />
      <main className="main-content">
        {currentPage === 'catalog' && (
          <PolicyCatalog
            selectedPolicies={selectedPolicies}
            setSelectedPolicies={setSelectedPolicies}
            setCurrentPage={setCurrentPage}
            filterType={filterType}
          />
        )}
        {currentPage === 'details' && (
          <PolicyDetails setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'compare' && (
          <ComparePolicies
            selectedPolicies={selectedPolicies}
            setSelectedPolicies={setSelectedPolicies}
          />
        )}
      </main>
    </div>
  );
}

export default App;

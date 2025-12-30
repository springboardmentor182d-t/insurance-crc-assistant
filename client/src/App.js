import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PageContainer from './layout/PageContainer';
import Home from './pages/Home';
import FileClaimForm from './features/claims/components/FileClaimForm';
import ClaimsList from './features/claims/components/ClaimsList';

function App() {
  return (
    <Router>
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/file-claim" element={<FileClaimForm />} />
          <Route path="/claims" element={<ClaimsList />} />
          <Route path="/help" element={<div className="p-10 text-2xl font-bold">Help Center</div>} />
        </Routes>
      </PageContainer>
    </Router>
  );
}

export default App;
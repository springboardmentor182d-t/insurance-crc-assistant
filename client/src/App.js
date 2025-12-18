import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PolicyDetails from './pages/PolicyDetails';
import Comparison from './pages/Comparison';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/policy-details/:id" element={<PolicyDetails />} />
        <Route path="/comparison" element={<Comparison />} />
      </Routes>
    </Router>
  );
}

export default App;
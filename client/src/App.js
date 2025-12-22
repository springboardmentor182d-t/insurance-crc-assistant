import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {PolicyLanding} from "./pages/PolicyLanding";
import { PolicyCatalogPage } from "./pages/PolicyCatalogPage";
import { ComparePage } from "./pages/Comparsion";

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/policies" element={<PolicyLanding />} />

     
        <Route
          path="/policies/:policyType"
          element={<PolicyCatalogPage />}
        />

     
        <Route path="/compare" element={<ComparePage />} />

      
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;

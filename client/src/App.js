import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PolicyCatalogPage } from "./pages/PolicyCatalogPage";
import { ComparePage } from "./pages/Comparsion";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import Policies from "./features/policies/Policies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/policies/:policyType" element={<PolicyCatalogPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<PolicyCatalog />} />
        <Route path="/policy-details/:id" element={<PolicyDetails />} />
        <Route path="/premium-calculator" element={<PremiumCalculator />} />
        <Route path="/policies" element={<Policies />} />
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

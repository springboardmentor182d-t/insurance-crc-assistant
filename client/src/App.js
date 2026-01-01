import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PolicyCatalogPage } from "./pages/PolicyCatalogPage";
import { ComparePage } from "./pages/Comparsion";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// ✅ Missing imports added
import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import Policies from "./features/policies/Policies";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Catalog */}
        <Route path="/" element={<PolicyCatalog />} />

        {/* Policy Catalog by type */}
        <Route
          path="/policies/:policyType"
          element={<PolicyCatalogPage />}
        />

        {/* Policies list */}
        <Route path="/policies" element={<Policies />} />

        {/* Policy details */}
        <Route
          path="/policy-details/:id"
          element={<PolicyDetails />}
        />

        {/* Premium Calculator */}
        <Route
          path="/premium-calculator"
          element={<PremiumCalculator />}
        />

        {/* Compare */}
        <Route path="/compare" element={<ComparePage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;

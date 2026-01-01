import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <Router>
      <Routes>


        <Route path="/" element={<PolicyCatalog />} />
        <Route
          path="/policies/:policyType"
          element={<PolicyCatalogPage />}
        />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policy-details/:id" element={<PolicyDetails />} />

      <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
        <Route
          path="/premium-calculator"
          element={<PremiumCalculator />}
        />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;

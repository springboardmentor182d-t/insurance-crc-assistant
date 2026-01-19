import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Comparsion, { ComparePage } from "./pages/Comparsion";
import Dashboard from "./pages/Dashboard";
/*import LandingPage from "./pages/Landingpage";*/
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import FraudDetection from "./pages/FraudDetection";
import FraudAnalysis from "./pages/FraudAnalysis";
import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import Policies from "./features/policies/Policies";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Policy routes */}
        <Route path="/policycatalog" element={<PolicyCatalog />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policies/details/:id" element={<PolicyDetails />} />
        <Route path="/premium-calculator" element={<PremiumCalculator />} />

        <Route path="/compare" element={<ComparePage />} />

        <Route path="/frauddetection" element={<FraudDetection />} />
        <Route path="/fraud-analysis" element={<FraudAnalysis />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

       
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/preferences" element={<Preferences />} />

        
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;

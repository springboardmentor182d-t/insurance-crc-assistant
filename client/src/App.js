import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PolicyCatalogPage } from "./pages/PolicyCatalogPage";
import { ComparePage } from "./pages/Comparsion";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";



function App() {
  return (
    <Router>
      <Routes>
     
        
     
        <Route
          path="/policies/:policyType"
          element={<PolicyCatalogPage />}
        />

     
        <Route path="/compare" element={<ComparePage />} />

      
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/profile" element={<Profile />} />
           <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </Router>
  );
}

export default App;

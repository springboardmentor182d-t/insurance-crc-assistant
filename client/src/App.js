import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";

/* AUTH PAGES */
import Landing from "./components/auth/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import OTPVerify from "./components/auth/OTPVerify";
import EnterOtp from "./components/auth/EnterOtp";
import ResetPassword from "./components/auth/ResetPassword";

/* MAIN PAGES */
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClaimsList from "./pages/claims/ClaimsList";
import ClaimDetails from "./pages/claims/ClaimDetails";
import Dummy from "./components/auth/Dummy";
import FraudDetection from "./pages/admin/FraudDetection";
import FraudInvestigation from "./pages/admin/FraudInvestigation";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Recommendations from "./pages/Recommendations";
import RecommendationView from "./pages/RecommendationView";
import PolicyCatalog from "./pages/policies/PolicyCatalog";
import PolicyDetails from "./pages/policies/PolicyDetails";
import ComparePolicies from "./pages/ComparePolicies";
import NotFound from "./pages/NotFound";

/* LAYOUT */
import PageContainer from "./layout/PageContainer";

/* ROUTE GUARDS */
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import { AuthContext } from './context/AuthContext';

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>

      {/* ---------- AUTH (NO NAVBAR) ---------- */}
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<OTPVerify />} />
      <Route path="/enter-otp" element={<EnterOtp/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/landing" element={<Landing/>} />
      <Route path="/dummy" element={<Dummy />} />
      <Route path="/enter-otp" element={<EnterOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* ---------- PROTECTED (WITH NAVBAR) ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PageContainer />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claims" element={<ClaimsList />} />
          <Route path="/claims/:claimNumber" element={<ClaimDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/recommendations/view/:id" element={<RecommendationView />} />
          <Route path="/policies" element={<PolicyCatalog />} />
          <Route path="/policies/:id" element={<PolicyDetails />} />
          <Route path="/compare" element={<ComparePolicies />} />
         
          {/* ---------- ADMIN ONLY ---------- */}
          <Route element={<RoleBasedRoute roleRequired="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/fraud/:claimId" element={<FraudInvestigation />} />
            <Route path="/admin/fraud" element={<FraudDetection />} />
          </Route>

        </Route>
      </Route>
      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
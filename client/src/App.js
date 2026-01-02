import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

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
import AdminDashboard from "./pages/AdminDashboard";
import ClaimsList from "./pages/claims/ClaimsList";
import ClaimDetails from "./pages/claims/ClaimDetails";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";

/* ROUTE GUARDS */
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import { AuthContext } from './context/AuthContext';
export default function App(){
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<OTPVerify />} />
      <Route path="/enter-otp" element={<EnterOtp/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/landing" element={<Landing/>} />
      <Route path="/claims" element={<ClaimsList />} />
      <Route path="/claims/:claimNumber" element={<ClaimDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/recommendations" element={<Recommendations />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<RoleBasedRoute roleRequired="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/auth/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import OTPVerify from './components/auth/OTPVerify';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import EnterOtp from "./components/auth/EnterOtp";
import ResetPassword from "./components/auth/ResetPassword";
import { AuthContext } from './context/AuthContext';
import ClaimsList from "./pages/claims/ClaimsList";
import ClaimDetails from "./pages/claims/ClaimDetails";
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

import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import ComparePolicies from "./pages/ComparePolicies";
import PolicyDetails from "./pages/PolicyDetails";
function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<ComparePolicies />} />
        <Route path="/" element={<Home />} />
        <Route path="/policies/:id" element={<PolicyDetails />} />
      </Routes>
    </div>
  );
}

export default App;


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
import { AuthContext } from './contexts/AuthContext';

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

import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function RoleBasedRoute({ roleRequired }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;

  const roles = user?.roles || (user?.role ? [user.role] : []);
  if (!roles.includes(roleRequired)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

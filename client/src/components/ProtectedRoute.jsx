import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
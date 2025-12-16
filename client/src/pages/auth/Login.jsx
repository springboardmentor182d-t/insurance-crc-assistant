import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginAsAdmin = () => {
    localStorage.setItem("role", "admin");
    navigate("/admin/dashboard");
  };

  const loginAsUser = () => {
    localStorage.setItem("role", "user");
    navigate("/user/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">Login</h1>

        <button
          onClick={loginAsAdmin}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Login as Admin
        </button>

        <button
          onClick={loginAsUser}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login as User
        </button>
      </div>
    </div>
  );
}
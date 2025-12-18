import { useState } from "react";
import api from "./services/api";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });

      const token = res.data.access_token;
      localStorage.setItem("token", token);

      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Admin login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-600">
      {/* LEFT ILLUSTRATION */}
      <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
        <img src="/images/Admin.png" alt="Admin Login" className="max-w-md" />
      </div>

      {/* RIGHT ADMIN LOGIN CARD */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <form
          onSubmit={submit}
          className="bg-[#fff5f5] rounded-xl shadow-lg w-[400px] p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>

          {/* USER LOGIN LINK */}
          <p className="text-center text-sm mt-5">
            User Login?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Click here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

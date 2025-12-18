import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("access_token", res.data.access_token);
      alert("Login successful");
      navigate("/LandingPage");
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.detail || "Invalid credentials");
      } else if (error.request) {
        alert("Server not responding. Try again later.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-600">
      {/* LEFT ILLUSTRATION SECTION */}
      <div className="hidden md:flex w-2/5 bg-blue-50 items-center justify-center">
        <img
          src="/images/Login.png"
          alt="Login Illustration"
          className="max-w-md"
        />
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full md:w-3/5 flex items-center justify-center">
        <form
          onSubmit={submit}
          className="bg-[#fff5f5] rounded-xl shadow-lg w-[400px] p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="username@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-2">
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-5">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Continue
          </button>

          {/* REGISTER LINK */}
          <p className="text-center text-sm mt-5">
            New User?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>

          {/* ADMIN LOGIN */}
          <p className="text-center text-sm mt-2">
            Admin Login?{" "}
            <Link to="/AdminLogin" className="text-blue-600 font-semibold">
              Admin
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

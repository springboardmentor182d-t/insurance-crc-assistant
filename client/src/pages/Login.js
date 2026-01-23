import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./login.css";
import { baseURL } from "../config";
import { useProfile } from "../context/ProfileContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useProfile();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ ONLY NEW FUNCTION
  const handleForgotPassword = () => {
    if (!form.email) {
      alert("Please enter your email first");
      return;
    }

    navigate("/forgot-password", {
      state: { email: form.email },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Invalid credentials");
        return;
      }

      // ✅ store token globally
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);

      // update context (optional but fine)
      login(data.access_token, data.role);


      alert("Login successful!");

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <img
              src="https://res.cloudinary.com/ds66aym8t/image/upload/v1766555411/signup_hdeoj9.png"
              alt="Insurance Illustration"
              className="hero-image"
            />
          </div>

          <div className="login-right">
            <h1>Welcome Back</h1>
            <p className="subtitle">
              Please enter your details to access your dashboard.
            </p>

            <form onSubmit={handleSubmit}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <div className="password-row">
                <label>Password</label>
                <span
                  className="forgot-link"
                  onClick={handleForgotPassword}
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </span>
              </div>

              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="signup-link">
              Don’t have an account?{" "}
              <Link to="/signup">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

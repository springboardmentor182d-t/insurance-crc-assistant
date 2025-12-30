import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: form.email, // OAuth2 expects username
          password: form.password,
        }),
      });

      const data = await response.json();

      // 🔍 VERY IMPORTANT DEBUG LINE
      console.log("LOGIN RESPONSE FROM BACKEND 👉", data);

      if (!response.ok) {
        alert(data.detail || "Invalid credentials");
        return;
      }

      // ✅ Save JWT token
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);

      alert("Login successful!");
      if (data.role === "ADMIN") {
      navigate("/admin");
      } else {
      navigate("/dashboard");
}
 // redirect after login
    } catch (error) {
      console.error("LOGIN ERROR 👉", error);
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
          {/* LEFT SIDE IMAGE */}
          <div className="login-left">
            <img
              src="https://res.cloudinary.com/ds66aym8t/image/upload/v1766555411/signup_hdeoj9.png"
              alt="Insurance Illustration"
              className="hero-image"
            />
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="login-right">
            <h1>Welcome Back</h1>
            <p className="subtitle">
              Please enter your details to access your dashboard.
            </p>

            <form onSubmit={handleSubmit}>
              <label>Email or Username</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <div className="password-row">
                <label>Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="divider">Or continue with</div>

            <div className="social-buttons">
              <button className="google-btn">Google</button>
              <button className="apple-btn">Apple</button>
            </div>

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

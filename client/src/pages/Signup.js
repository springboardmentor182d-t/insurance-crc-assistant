import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./signup.css";
import { baseURL } from "../config";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.agree) {
      alert("You must agree to Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Failed to send OTP");
        return;
      }

      alert(data.message);

      navigate("/otp", {
        state: {
          email: form.email,
          fullName: form.fullName,
          password: form.password,
          flow: "register",
        },
      });
    } catch (error) {
      alert(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-container">
        <div className="signup-card">
          {/* LEFT SIDE */}
          <div className="signup-left">
            <h2>We’ve got you covered, rain or shine.</h2>
            <p>
              Insurance is not just a policy; it’s a promise to rebuild, recover,
              and restore hope when life takes an unexpected turn.
            </p>

            {/* ✅ IMAGE RESTORED */}
            <img
              src="https://res.cloudinary.com/ds66aym8t/image/upload/v1766555411/signup_hdeoj9.png"
              alt="Insurance Illustration"
              className="signup-illustration"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="signup-right">
            <h1>Create your account</h1>
            <p className="subtitle">
              Start comparing the best insurance plans for you and your family.
            </p>

            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className="terms">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span>
                  I agree to the <Link to="#">Terms of Service</Link> and{" "}
                  <Link to="#">Privacy Policy</Link>
                </span>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Verify Email →"}
              </button>
            </form>

            <p className="login-link">
            <span className="login-text">Already have an account?</span>{" "}
            <Link to="/login">Login</Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

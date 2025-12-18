// src/components/auth/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import "../../styles/Signup.css";   // ✅ NEW CSS FILE
import AuthIllustration from "../../components/common/AuthIllustration";
import { register } from "../../api/authService";

export default function Signup() {
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password || !confirm) {
      setError("Please fill all required fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        full_name: fullName,
        email,
        password,
      });
      nav("/login");
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Header */}
      <header className="insure-header header-no-border">
        <div className="brand">
          <div className="logo" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 5v6c0 5.523 3.582 10.74 8 11 4.418-.26 8-5.477 8-11V5l-8-3z" fill="#2563EB" opacity="0.18"/>
              <path d="M12 3.25l6 2.25v5.5c0 4.5-2.92 8.7-6 8.95-3.08-.25-6-4.45-6-8.95V5.5l6-2.25z" fill="#2563EB"/>
            </svg>
          </div>
          <div className="brand-name">InsureHub</div>
        </div>

        <nav className="nav-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </nav>
      </header>

      {/* Main area */}
      <main className="signup-container">
        <div className="signup-card signup-layout" role="main" aria-labelledby="signup-title">

          {/* LEFT: Form */}
          <div className="signup-left">
            <div className="signup-form-wrapper">
              <h1 id="signup-title" className="signup-title">
                Create Account
              </h1>

              <p className="lead signup-subtitle">
                Join us and simplify your insurance journey
              </p>

              {error && <div className="msg-error signup-error">{error}</div>}

              <form onSubmit={handleCreate} autoComplete="off">
                <label className="field-label">Full Name</label>
                <input
                  className="input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <label className="field-label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />

                <label className="field-label">Phone Number</label>
                <input
                  className="input"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <label className="field-label">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />

                <label className="field-label">Confirm Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                />

                <div className="signup-button-wrapper">
                  <button
                    className="btn-primary signup-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="signup-footer">
                Already have an account?{" "}
                <Link to="/login" className="small-link">Login</Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Illustration */}
          <div className="signup-right">
            <div className="signup-illustration-wrapper">
              <AuthIllustration width={480} height={480} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

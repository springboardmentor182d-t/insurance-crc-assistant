// src/components/auth/ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api/authService";
import "../../styles/ResetPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requirementsOk = (pw) =>
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /\d/.test(pw);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email not found. Please restart the reset process.");
      return;
    }
    if (!requirementsOk(password)) {
      setError("Password does not meet requirements.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, password);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.detail || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reset-page">
      {/* Header */}
      <header className="reset-header">
        <div className="reset-brand">
          <div className="reset-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 5v6c0 5.523 3.582 10.74 8 11 4.418-.26 8-5.477 8-11V5l-8-3z" fill="#2563EB"/>
            </svg>
          </div>
          <div className="reset-brand-name">InsureHub</div>
        </div>

        <nav className="reset-nav">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="reset-signup-btn">Sign Up</Link>
        </nav>
      </header>

      {/* Main */}
      <main className="reset-main">
        <section className="reset-grid">
          {/* LEFT */}
          <div className="reset-illustration">
            <div className="reset-illustration-inner">
              <svg viewBox="0 0 600 600" aria-hidden>
                <rect width="600" height="600" rx="24" fill="#F5FBFF"/>
                <g transform="translate(70,110)">
                  <circle cx="210" cy="100" r="90" fill="#F0F8FF"/>
                  <rect x="85" y="210" rx="16" width="250" height="140" fill="#fff" stroke="#E8F2FF" strokeWidth="12"/>
                  <circle cx="210" cy="30" r="22" fill="#F4A300"/>
                </g>
              </svg>
            </div>
          </div>

          {/* RIGHT */}
          <div className="reset-card-wrapper">
            <div className="reset-card">
              <Link to="/login" className="reset-back">↩ Back</Link>

              <h1 className="reset-title">Create New Password</h1>
              <p className="reset-subtitle">
                Please enter your new password. Make sure it's strong and secure.
              </p>

              {error && <div className="reset-error">{error}</div>}

              <form onSubmit={onSubmit}>
                <label className="reset-label">New Password</label>
                <div className="reset-input-wrapper">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="reset-input"
                    placeholder="Enter new password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="eye-btn">
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>

                <label className="reset-label">Confirm Password</label>
                <div className="reset-input-wrapper">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    className="reset-input"
                    placeholder="Confirm new password"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="eye-btn">
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>

                <div className="reset-requirements">
                  <strong>Password Requirements:</strong>
                  <ul>
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                  </ul>
                </div>

                <button type="submit" disabled={loading} className="reset-submit">
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Feature bar */}
        <div className="reset-features">
          <div className="feature">
            <div className="feature-icon blue">✉</div>
            <h3>Secure OTP</h3>
            <p>6-digit one-time password sent to your registered email</p>
          </div>
          <div className="feature">
            <div className="feature-icon green">⤓</div>
            <h3>Instant Reset</h3>
            <p>Reset your password instantly without leaving the page</p>
          </div>
          <div className="feature">
            <div className="feature-icon yellow">✓</div>
            <h3>Verified Security</h3>
            <p>Multi-step verification ensures your account security</p>
          </div>
        </div>
      </main>
    </div>
  );
}

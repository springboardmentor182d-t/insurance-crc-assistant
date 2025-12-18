// src/components/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import "../../styles/ForgotPassword.css"; // ✅ NEW CSS FILE
import AuthIllustration from "../../components/common/AuthIllustration";
import { forgotPassword } from "../../api/authService";

export default function ForgotPassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      nav("/enter-otp", { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to send OTP");
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

      <main className="signup-container forgot-container">
        {/* Main card */}
        <div className="signup-card forgot-layout" role="main" aria-labelledby="forgot-title">

          {/* LEFT (illustration – 60%) */}
          <div className="forgot-illustration">
            <div className="forgot-illustration-inner">
              <AuthIllustration width={520} height={520} />
            </div>
          </div>

          {/* RIGHT (form – 40%) */}
          <div className="forgot-form">
            <div className="forgot-form-inner">
              <Link to="/login" className="forgot-back">
                <span className="back-arrow">↩</span>
                <span>Back to Login</span>
              </Link>

              <h1 id="forgot-title" className="forgot-title">
                Forgot <br /> Password?
              </h1>

              <p className="lead forgot-subtitle">
                No worries! Enter your email address and we'll send you a one-time password (OTP) to reset your password.
              </p>

              {error && <div className="msg-error forgot-error">{error}</div>}

              <form onSubmit={sendOtp} className="forgot-form-fields">
                <label className="field-label">Email Address</label>

                <div className="email-input-wrapper">
                  <input
                    className="input email-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                  />
                  <span className="email-icon">✉</span>
                </div>

                <div className="forgot-button-wrapper">
                  <button
                    className="btn-primary forgot-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </form>

              <div className="forgot-footer">
                Remember your password?{" "}
                <Link to="/login" className="small-link">Sign In</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES BAR */}
        <div className="forgot-features">
          <div className="features-inner">

            <div className="feature">
              <div className="feature-icon email">✉</div>
              <h3>Secure OTP</h3>
              <p>6-digit one-time password sent to your registered email</p>
            </div>

            <div className="feature">
              <div className="feature-icon download">⤓</div>
              <h3>Instant Reset</h3>
              <p>Reset your password instantly without leaving the page</p>
            </div>

            <div className="feature">
              <div className="feature-icon verify">✓</div>
              <h3>Verified Security</h3>
              <p>Multi-step verification ensures your account security</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

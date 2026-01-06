// src/components/auth/EnterOtp.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import "../../styles/EnterOtp.css"; // ✅ NEW CSS FILE
import AuthIllustration from "../../components/common/AuthIllustration";
import { verifyOtp, forgotPassword } from "../../api/authService";

export default function EnterOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state && location.state.email) || "your@email.com";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[idx] = val ? val[val.length - 1] : "";
    setOtp(newOtp);
    if (val && idx < 5) inputsRef.current[idx + 1].focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, code);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setResendLoading(true);
    try {
      await forgotPassword(email);
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setResendLoading(false);
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

      <main className="signup-container otp-container">
        <div className="signup-card otp-layout" role="main" aria-labelledby="otp-title">

          {/* LEFT */}
          <div className="otp-illustration">
            <div className="otp-illustration-inner">
              <AuthIllustration width={520} height={520} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="otp-form">
            <div className="otp-form-inner">
              <Link to="/login" className="otp-back">
                <span className="back-arrow">↩</span>
                <span>Back</span>
              </Link>

              <h1 id="otp-title" className="otp-title">Enter OTP</h1>

              <p className="lead otp-subtitle">
                We've sent a 6-digit code to <strong>{email}</strong>
              </p>

              <div className="msg-success">OTP sent successfully</div>

              <form onSubmit={verifyOtpHandler}>
                <label className="field-label">One-Time Password</label>

                <div className="otp-input-row">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      value={val}
                      onChange={(e) => handleChange(e, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="otp-input"
                    />
                  ))}
                </div>

                {error && <div className="msg-error otp-error">{error}</div>}

                <div className="otp-button-wrapper">
                  <button
                    className="btn-primary otp-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>

                <div className="otp-resend">
                  Didn't receive the code?{" "}
                  <a href="#resend" onClick={resendOtp}>
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FEATURES BAR */}
        <div className="otp-features">
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

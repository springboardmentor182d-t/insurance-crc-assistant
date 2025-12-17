// src/components/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import AuthIllustration from "../../components/common/AuthIllustration";
import { forgotPassword } from "../../api/authService";

/**
 * Final ForgotPassword page (updated)
 * - Left illustration wider (60%) and right form smaller (40%)
 * - Send OTP button reduced to fixed width and centered
 * - Features bar remains below the main card
 *
 * Save as: src/components/auth/ForgotPassword.jsx
 */
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
    await forgotPassword(email);   // ✅ BACKEND CALLED HERE
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
      <header className="insure-header" style={{ borderBottom: "none" }}>
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

      {/* Main area: illustration left + card right */}
      <main className="signup-container">
        {/* grid card: LEFT bigger (60%), RIGHT smaller (40%) */}
        <div
          className="signup-card login-layout"
          role="main"
          aria-labelledby="forgot-title"
          style={{ alignItems: "stretch" }}
        >
          {/* Left illustration column (wider) */}
          <div
            className="signup-right"
            style={{
              background: "#EEF8FF",
              padding: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 520, height: 520, maxWidth: "100%" }}>
              <AuthIllustration width={520} height={520} />
            </div>
          </div>

          {/* Right content column (narrower) */}
          <div
            className="signup-left"
            style={{
              paddingLeft: 46,
              paddingRight: 46,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: 480 }}>
              <Link to="/login" className="small-link" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ transform: "rotate(180deg)" }}>↩</span>
                <span style={{ color: "var(--muted)" }}>Back to Login</span>
              </Link>

              <h1 id="forgot-title" style={{ marginTop: 12, marginBottom: 10, fontSize: 44, lineHeight: 1.02, color: "#071043" }}>
                Forgot <br /> Password?
              </h1>

              <p className="lead" style={{ maxWidth: 440, marginBottom: 12 }}>
                No worries! Enter your email address and we'll send you a one-time password (OTP) to reset your password.
              </p>

              {error && <div className="msg-error" style={{ marginTop: 12 }}>{error}</div>}

              <form onSubmit={sendOtp} style={{ marginTop: 18 }}>
                <label className="field-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ paddingLeft: 46 }}
                  />
                  <span style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9aa8bf",
                    pointerEvents: "none",
                    fontSize: 16
                  }}>✉</span>
                </div>

                {/* Reduced-size centered button */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 18,
                      width: 260,
                      height: 48,
                      fontSize: 16,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </form>

              <div style={{ marginTop: 18, textAlign: "center", color: "var(--muted)" }}>
                Remember your password? <Link to="/login" className="small-link">Sign In</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ------ FEATURES BAR (placed BELOW the main card) ------ */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div style={{
            width: "85%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            background: "linear-gradient(180deg,#F3F8FF,#EAF6FF)",
            padding: "30px 40px",
            borderRadius: 20,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.05)"
          }}>
            <div style={{ flex: 1, textAlign: "center", padding: "8px 12px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 12px", background: "#e6f0ff", color: "#1a73e8", fontSize: 28
              }}>✉</div>
              <h3 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700, color: "#071043" }}>Secure OTP</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.45 }}>
                6-digit one-time password sent to your registered email
              </p>
            </div>

            <div style={{ flex: 1, textAlign: "center", padding: "8px 12px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 12px", background: "#e9fff2", color: "#06c08a", fontSize: 28
              }}>⤓</div>
              <h3 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700, color: "#071043" }}>Instant Reset</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.45 }}>
                Reset your password instantly without leaving the page
              </p>
            </div>

            <div style={{ flex: 1, textAlign: "center", padding: "8px 12px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 12px", background: "#fff6e6", color: "#f59e0b", fontSize: 28
              }}>✓</div>
              <h3 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700, color: "#071043" }}>Verified Security</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.45 }}>
                Multi-step verification ensures your account security
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Embedded small CSS to ensure the left column is wider and responsiveness works */}
      <style>{`
        /* Make left column much wider than right (60% / 40%) */
        .signup-card.login-layout {
          grid-template-columns: 60% 40% !important;
        }

        /* Keep container vertical stacking and spacing correct */
        .signup-container { display:flex; flex-direction:column; align-items:center; padding:40px 72px 80px; min-height: calc(100vh - 72px); }

        /* Safety: ensure card grid and stretch */
        .signup-card { width:100%; max-width:1180px; display:grid; gap:0; border-radius:18px; box-shadow:0 30px 60px rgba(16,24,40,0.08); border:1px solid rgba(2,6,23,0.04); overflow:visible; align-items:stretch; }

        /* Responsive: on smaller screens stack columns */
        @media (max-width:1000px) {
          .signup-card.login-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

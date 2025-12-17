// src/components/auth/EnterOtp.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import AuthIllustration from "../../components/common/AuthIllustration";
import { verifyOtp } from "../../api/authService";
import { forgotPassword } from "../../api/authService";

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
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[idx] = val ? val[val.length - 1] : "";
    setOtp(newOtp);

    if (val && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  // 🔥 FIXED: OTP VERIFY LOGIC (ONLY LOGIC)
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
      await verifyOtp(email, code); // backend validation
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: RESEND OTP (LOGIC ONLY)
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

      {/* Main area */}
      <main className="signup-container">
        <div className="signup-card login-layout" role="main" aria-labelledby="otp-title" style={{ alignItems: "stretch" }}>
          {/* LEFT: Illustration (wider like ForgotPassword) */}
          <div className="signup-right" style={{ background: "#EEF8FF", padding: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 520, height: 520, maxWidth: "100%" }}>
              <AuthIllustration width={520} height={520} />
            </div>
          </div>

          {/* RIGHT: OTP card */}
          <div className="signup-left" style={{ paddingLeft: 46, paddingRight: 46, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 560 }}>
              <Link to="/login" className="small-link" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ transform: "rotate(180deg)" }}>↩</span>
                <span style={{ color: "var(--muted)" }}>Back</span>
              </Link>

              <h1 id="otp-title" style={{ marginTop: 12, marginBottom: 6, fontSize: 44, lineHeight: 1.02, color: "#071043" }}>
                Enter OTP
              </h1>

              <p className="lead" style={{ marginBottom: 18 }}>
                We've sent a 6-digit code to <strong style={{ color: "#0b1b3a" }}>{email}</strong>
              </p>
              <div className="msg-success">OTP sent successfully</div>

              <form onSubmit={verifyOtpHandler}>
                <label className="field-label">One-Time Password</label>

                <div style={{ display: "flex", gap: 12, marginTop: 10, marginBottom: 22 }}>
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
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 8,
                        border: "2px solid #d6dfee",
                        textAlign: "center",
                        fontSize: 22,
                        outline: "none",
                        background: "#fff",
                      }}
                    />
                  ))}
                </div>

                {error && <div className="msg-error" style={{ marginBottom: 12 }}>{error}</div>}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 4,
                      width: 420,
                      height: 48,
                      fontSize: 16,
                      borderRadius: 10,
                      boxShadow: "0 10px 25px rgba(37,99,235,0.18)"
                    }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>

                <div style={{ marginTop: 16, textAlign: "center", color: "var(--muted)" }}>
                  Didn't receive the code?{" "}
                  <a href="#resend" onClick={resendOtp} style={{ color: "#2563EB", cursor: "pointer" }}>
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Featuresbar under the main card */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div style={{
            width: "85%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            background: "linear-gradient(180deg,#F3F8FF,#EAF6FF)",
            padding: "30px 40px",
            borderRadius: 20,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.05)"
          }}>
            <div style={{ flex: 1, textAlign: "center", padding: "8px 12px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", background: "#e6f0ff", color: "#1a73e8", fontSize: 28
              }}>✉</div>
              <h3 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700, color: "#071043" }}>Secure OTP</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.45 }}>
                6-digit one-time password sent to your registered email
              </p>
            </div>

            <div style={{ flex: 1, textAlign: "center", padding: "8px 12px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", background: "#e9fff2", color: "#06c08a", fontSize: 28
              }}>⤓</div>
              <h3 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700, color: "#071043" }}>Instant Reset</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.45 }}>
                Reset your password instantly without leaving the page
              </p>
            </div>

            <div style={{ flex: 1, textAlign: "center", padding: "8px 12px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", background: "#fff6e6", color: "#f59e0b", fontSize: 28
              }}>✓</div>
              <h3 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700, color: "#071043" }}>Verified Security</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.45 }}>
                Multi-step verification ensures your account security
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Embedded CSS: left wider, responsive */}
      <style>{`
        .signup-card.login-layout {
          grid-template-columns: 60% 40% !important;
          width: 100%;
          max-width: 1180px;
          display: grid;
          border-radius: 18px;
          box-shadow: 0 30px 60px rgba(16,24,40,0.08);
          border: 1px solid rgba(2,6,23,0.04);
          overflow: visible;
        }
        .signup-container { display:flex; flex-direction:column; align-items:center; padding:40px 72px 80px; min-height: calc(100vh - 72px); }
        @media (max-width:1000px) {
          .signup-card.login-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

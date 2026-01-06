// src/components/auth/OTPVerify.jsx
import React, { useState } from "react";
import { verifyOtp } from "../../api/authService";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/insurehub.css";
import "../../styles/OTPVerify.css";   // ✅ NEW CSS FILE

export default function OTPVerify() {
  const nav = useNavigate();
  const loc = useLocation();
  const initialEmail = loc.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      nav("/dashboard");
    } catch (err) {
      setMsg(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Illustration */}
      <div className="auth-illustration">
        <svg width="420" height="360">
          <rect rx="18" width="420" height="360" fill="#FFF8EC" />
          <text x="30" y="160" fill="#F59E0B" fontSize="22">
            Enter OTP
          </text>
        </svg>
      </div>

      {/* Card */}
      <div className="auth-card">
        <a href="/forgot-password" className="small-link auth-back">
          ← Back
        </a>

        <h1 className="auth-title">Enter OTP</h1>

        <p className="lead auth-subtitle">
          We've sent a 6-digit code to <strong>{email || "your email"}</strong>
        </p>

        {msg && <div className="msg-error">{msg}</div>}

        <form onSubmit={submit}>
          <label className="field-label">One-Time Password</label>
          <input
            className="input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            required
          />

          <button
            className="btn-primary otpverify-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="otpverify-resend">
          <button className="small-link" type="button">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

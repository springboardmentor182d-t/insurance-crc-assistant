import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import AuthIllustration from "../../components/common/AuthIllustration";
import { login } from "../../api/authService";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
  e.preventDefault();
  setMsg(null);
  setLoading(true);

  try {
    const res = await login(email, password);

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);

    nav("/dashboard");
  } catch (err) {
    setMsg(err?.response?.data?.detail || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-page">
      {/* HEADER */}
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

      {/* BODY */}
      <main className="signup-container">
        <div className="signup-card login-layout" role="main" aria-labelledby="login-title">

          {/* LEFT Illustration (50%) */}
          <div
            className="signup-left-image"
            style={{
              background: "#EEF8FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40
            }}
          >
            <AuthIllustration width={480} height={480} />
          </div>

          {/* RIGHT LOGIN FORM (50%) */}
          <div
            className="signup-right-form"
            style={{
              padding: "60px 50px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <div style={{ width: "100%", maxWidth: 500 }}>
              <h1 id="login-title" style={{ marginBottom: 10, fontSize: 44, fontWeight: 800, color: "#071043" }}>
                Welcome Back
              </h1>

              <p className="lead" style={{ marginBottom: 20 }}>
                Login to access your insurance dashboard
              </p>

              {msg && (
                <div className="msg-error" style={{ marginBottom: 12 }}>{msg}</div>
              )}

              <form onSubmit={submit}>
                <label className="field-label">Email Address</label>
                <input
                  autoComplete="off"
                  className="input"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="field-label">Password</label>
                <input
                  autoComplete="new-password"
                  className="input"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    <span style={{ fontWeight: 600, color: "#0b1b3a" }}>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="small-link">Forgot Password?</Link>
                </div>

                {/* smaller centered button */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 20,
                      width: 240,
                      height: 45,
                      fontSize: 16,
                      borderRadius: 10
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <div style={{ marginTop: 25, textAlign: "center" }}>
                Don't have an account? <Link to="/signup" className="small-link">Create Account</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .signup-card.login-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;   /* 50% 50% */
          width: 100%;
          max-width: 1180px;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 30px 60px rgba(16, 24, 40, 0.08);
          border: 1px solid rgba(2, 6, 23, 0.04);
        }

        @media (max-width: 900px) {
          .signup-card.login-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

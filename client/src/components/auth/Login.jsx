import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import "../../styles/Login.css";   // ✅ NEW CSS FILE
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

      {/* BODY */}
      <main className="signup-container">
        <div className="signup-card login-layout" role="main" aria-labelledby="login-title">

          {/* LEFT */}
          <div className="login-left">
            <AuthIllustration width={480} height={480} />
          </div>

          {/* RIGHT */}
          <div className="login-right">
            <div className="login-form-wrapper">
              <h1 id="login-title" className="login-title">
                Welcome Back
              </h1>

              <p className="lead login-subtitle">
                Login to access your insurance dashboard
              </p>

              {msg && <div className="msg-error login-error">{msg}</div>}

              <form onSubmit={submit}>
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

                <label className="field-label">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />

                <div className="login-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <Link to="/forgot-password" className="small-link">
                    Forgot Password?
                  </Link>
                </div>

                <div className="login-button-wrapper">
                  <button
                    className="btn-primary login-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="login-footer">
                Don't have an account?{" "}
                <Link to="/signup" className="small-link">
                  Create Account
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

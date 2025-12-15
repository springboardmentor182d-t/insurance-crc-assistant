// src/components/auth/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/insurehub.css";
import AuthIllustration from "../../components/common/AuthIllustration";
import { register } from "../../api/authService";

/**
 * Signup page (50/50 layout)
 * - Left: form (50%)
 * - Right: illustration (50%)
 * - Reduced-width Create Account button (centered)
 *
 * Save as: src/components/auth/Signup.jsx
 */
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

    nav("/login"); // go to login after signup
  } catch (err) {
    setError(err?.response?.data?.detail || "Registration failed");
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

      {/* Main area */}
      <main className="signup-container">
        <div className="signup-card signup-layout" role="main" aria-labelledby="signup-title">
          {/* LEFT: Form (50%) */}
          <div style={{ padding: "60px 56px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: 520, width: "100%" }}>
              <h1 id="signup-title" style={{ fontSize: 44, fontWeight: 800, marginBottom: 8, color: "#071043" }}>
                Create Account
              </h1>
              <p className="lead" style={{ marginBottom: 18 }}>
                Join us and simplify your insurance journey
              </p>

              {error && <div className="msg-error" style={{ marginBottom: 12 }}>{error}</div>}

              <form onSubmit={handleCreate}>
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
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Create a password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label className="field-label">Confirm Password</label>
                <input
                  className="input"
                  placeholder="Confirm your password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />

                {/* Compact centered Create Account button */}
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
                      borderRadius: 10,
                    }}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div style={{ marginTop: 18, textAlign: "center", color: "var(--muted)" }}>
                Already have an account? <Link to="/login" className="small-link">Login</Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Illustration (50%) */}
          <div style={{
            background: "#FFF3D8", /* warm yellow background like screenshot */
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40
          }}>
            {/* The same illustration component; adjust size so it fits */}
            <div style={{ width: 480, height: 480, maxWidth: "100%" }}>
              <AuthIllustration width={480} height={480} />
            </div>
          </div>
        </div>
      </main>

      {/* Embedded CSS to enforce 50/50 layout and responsive behavior */}
      <style>{`
        .signup-card.signup-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;  /* 50% / 50% */
          width: 100%;
          max-width: 1180px;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 30px 60px rgba(16,24,40,0.08);
          border: 1px solid rgba(2,6,23,0.04);
        }

        @media (max-width: 900px) {
          .signup-card.signup-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

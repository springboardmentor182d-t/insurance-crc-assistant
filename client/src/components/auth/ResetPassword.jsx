// src/components/auth/ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../api/authService";

/**
 * ResetPassword.jsx
 * - Left: large illustration
 * - Right: lowered card (top pushed down) — matches screenshot
 * - Self-contained svg fallback illustration (no external images required)
 *
 * Usage:
 *  - Add route: <Route path="/reset-password" element={<ResetPassword/>} />
 *  - Put file at src/components/auth/ResetPassword.jsx
 */

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();        // ✅ ADDED
  const email = location.state?.email;   // ✅ ADDED

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
      await resetPassword(email, password);   // ✅ NOW WORKS
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.detail || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  // Simple inline illustration fallback (keeps layout predictable)
  const Illustration = ({ width = 520, height = 520 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="0" y="0" width="600" height="600" rx="24" fill="#F5FBFF"/>
      <g transform="translate(70,110)">
        <circle cx="210" cy="100" r="90" fill="#F0F8FF"/>
        <rect x="85" y="210" rx="16" ry="16" width="250" height="140" fill="#fff" stroke="#E8F2FF" strokeWidth="12"/>
        <circle cx="210" cy="30" r="22" fill="#F4A300"/>
        <rect x="0" y="190" rx="8" width="480" height="300" fill="transparent"/>
        <circle cx="330" cy="220" r="16" fill="#10B981"/>
        <rect x="180" y="255" width="40" height="8" rx="4" fill="#A7C6FF"/>
      </g>
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f6fafc" }}>
      {/* Header */}
      <header style={{
        height: 76,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        background: "#fff",
        boxShadow: "0 1px 0 rgba(16,24,40,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: "linear-gradient(180deg,#E6F0FF,#DFF0FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 30px rgba(2,6,23,0.06)"
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 5v6c0 5.523 3.582 10.74 8 11 4.418-.26 8-5.477 8-11V5l-8-3z" fill="#2563EB"/></svg>
          </div>
          <div style={{ fontWeight: 700, color: "#2563EB", fontSize: 18 }}>InsureHub</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/login" style={{ color: "#2563EB", textDecoration: "none" }}>Login</a>
          <a href="/signup" style={{
            background: "linear-gradient(180deg,#2D6DF6,#215CE0)",
            color: "#fff", padding: "10px 18px", borderRadius: 12, textDecoration: "none"
          }}>Sign Up</a>
        </div>
      </header>

      {/* Main container: grid with left big illustration + right lowered card */}
      <main style={{
        maxWidth: 1200,
        margin: "36px auto",
        padding: "0 20px"
      }}>
        <section style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          gap: 24,
          alignItems: "start"
        }}>
          {/* LEFT big illustration (keeps top aligned) */}
          <div style={{
            background: "#f6fbff",
            borderRadius: 18,
            padding: 28,
            minHeight: 520,
            boxShadow: "0 30px 60px rgba(16,24,40,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <div style={{ width: "100%", maxWidth: 520, aspectRatio: "1 / 1" }}>
              <Illustration />
            </div>
          </div>

          {/* RIGHT lowered card: push down using marginTop */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 80 // <-- this pushes the right card down relative to the left art
          }}>
            <div style={{
              width: "100%",
              maxWidth: 540,
              background: "#fff",
              padding: "44px 48px",
              borderRadius: 18,
              boxShadow: "0 30px 50px rgba(16,24,40,0.06)",
              border: "1px solid rgba(2,6,23,0.04)"
            }}>
              <Link to="/login" style={{ color: "#2563EB", textDecoration: "none", display: "inline-block", marginBottom: 8 }}>↩ Back</Link>
              <h1 style={{ fontSize: 44, margin: "6px 0 12px", color: "#071043", lineHeight: 1.02 }}>Create New Password</h1>
              <p style={{ color: "#556574", marginBottom: 18 }}>Please enter your new password. Make sure it's strong and secure.</p>

              {error && (
                <div style={{
                  background: "rgba(255,235,238,0.9)",
                  color: "#9D2631",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 12
                }}>{error}</div>
              )}

              <form onSubmit={onSubmit}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>New Password</label>
                <div style={{ position: "relative", marginBottom: 14 }}>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    type={showPass ? "text" : "password"}
                    style={{
                      width: "100%", padding: "16px 48px 16px 16px",
                      borderRadius: 10, border: "1px solid #E6EEF6", background: "#FAFDFF",
                      outline: "none", fontSize: 15
                    }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    border: "none", background: "transparent", cursor: "pointer"
                  }}>{showPass ? "🙈" : "👁️"}</button>
                </div>

                <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Confirm Password</label>
                <div style={{ position: "relative", marginBottom: 18 }}>
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    type={showConfirm ? "text" : "password"}
                    style={{
                      width: "100%", padding: "16px 48px 16px 16px",
                      borderRadius: 10, border: "1px solid #E6EEF6", background: "#FAFDFF",
                      outline: "none", fontSize: 15
                    }}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    border: "none", background: "transparent", cursor: "pointer"
                  }}>{showConfirm ? "🙈" : "👁️"}</button>
                </div>

                <div style={{
                  borderRadius: 12,
                  border: "2px solid rgba(37,99,235,0.16)",
                  background: "linear-gradient(180deg, rgba(243,248,255,0.9), rgba(234,246,255,0.9))",
                  padding: 16,
                  marginBottom: 20
                }}>
                  <strong style={{ display: "block", marginBottom: 8 }}>Password Requirements:</strong>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "#516779" }}>
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                  </ul>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      minWidth: 160,
                      background: "linear-gradient(180deg,#2D6DF6,#215CE0)",
                      color: "#fff",
                      padding: "12px 22px",
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "0 14px 30px rgba(37,99,235,0.18)",
                      fontSize: 16,
                      cursor: "pointer"
                    }}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Feature bar below - slightly overlapping or lower on page like your screenshot */}
        <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "92%",
            borderRadius: 18,
            padding: "28px 32px",
            background: "linear-gradient(180deg,#F3F8FF,#EAF6FF)",
            boxShadow: "0 18px 40px rgba(16,24,40,0.05)",
            display: "flex",
            justifyContent: "space-between",
            gap: 20
          }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 12px", borderRadius: 12, background: "#E8F0FF", display: "flex", alignItems: "center", justifyContent: "center" }}>✉</div>
              <h3 style={{ margin: 0, fontSize: 20 }}>Secure OTP</h3>
              <p style={{ color: "#516779", marginTop: 8 }}>6-digit one-time password sent to your registered email</p>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 12px", borderRadius: 12, background: "#E9FFF2", display: "flex", alignItems: "center", justifyContent: "center" }}>⤓</div>
              <h3 style={{ margin: 0, fontSize: 20 }}>Instant Reset</h3>
              <p style={{ color: "#516779", marginTop: 8 }}>Reset your password instantly without leaving the page</p>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 12px", borderRadius: 12, background: "#FFF5E6", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
              <h3 style={{ margin: 0, fontSize: 20 }}>Verified Security</h3>
              <p style={{ color: "#516779", marginTop: 8 }}>Multi-step verification ensures your account security</p>
            </div>
          </div>
        </div>
      </main>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 980px) {
          section { grid-template-columns: 1fr !important; }
          /* stack: illustration first, then card; remove margin on right card */
          section > div:nth-child(2) { margin-top: 28px !important; }
        }
      `}</style>
    </div>
  );
}

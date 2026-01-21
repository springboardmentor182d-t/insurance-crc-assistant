import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./forgotpassword.css";
import { baseURL } from "../config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [loading, setLoading] = useState(false);

  // 🔐 Prevent direct access
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await fetch(`${baseURL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // 🔹 Always navigate (no info leak)
      navigate("/otp", {
        state: {
          email,
          flow: "forgot",
        },
      });
    } catch (error) {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="forgot-container">
        <div className="forgot-card">
          <div className="icon">🔐</div>

          <h2>Forgot Password?</h2>
          <p>
            We will send an OTP to your registered email address.
          </p>

          {/* ✅ EMAIL DISPLAY ONLY */}
          <div className="email-display">
            <strong>{email}</strong>
          </div>

          <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </form>

          <div className="back-link" onClick={() => navigate("/login")}>
            ← Back to Login
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

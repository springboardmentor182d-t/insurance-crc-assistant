import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./resetpassword.css";
import { baseURL } from "../config";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("reset_email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await fetch(`${baseURL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      localStorage.removeItem("reset_email");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="reset-container">
        <div className="reset-card">

          {/* LEFT – IMAGE (SAME AS REGISTER) */}
          <div className="reset-left">
            <img
              src="https://res.cloudinary.com/ds66aym8t/image/upload/v1766555411/signup_hdeoj9.png"
              alt="Insurance Illustration"
              className="reset-illustration"
            />
          </div>

          {/* RIGHT – FORM (SAME STYLE AS REGISTER) */}
          <div className="reset-right">
            <h1>Reset Password</h1>
            <p className="subtitle">
              Please enter your new password to secure your account.
            </p>

            <form onSubmit={handleResetPassword}>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="login-link" onClick={() => navigate("/login")}>
              ← Back to Login
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ResetPassword;

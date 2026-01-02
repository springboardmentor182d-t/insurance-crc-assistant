import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./otp.css";
import { baseURL } from "../config";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Email passed from ForgotPassword page
  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  // 🔐 Prevent direct access
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/login`,
        { method: "POST" }
      );

      const data = await response.json();
      console.log("OTP VERIFY RESPONSE 👉", data);

      if (!response.ok) {
        alert(data.detail || "Invalid or expired OTP");
        return;
      }

      // ✅ Persist email for reset step
      localStorage.setItem("reset_email", email);

      // ✅ Redirect to reset password
      navigate("/reset-password");
    } catch (error) {
      console.error("OTP VERIFY ERROR 👉", error);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/forgot-password?email=${encodeURIComponent(
          email
        )}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Failed to resend OTP");
        return;
      }

      alert("OTP resent successfully!");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <>
      <Navbar />

      <div className="otp-container">
        <div className="otp-card">
          <div className="lock-icon">🔒</div>

          <h2>Verify OTP</h2>
          <p>
            We've sent a 6-digit verification code to your email <br />
            <strong>{email}</strong>
          </p>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>

          <div className="resend">
            Didn't receive the code?{" "}
            <span onClick={handleResend}>Resend</span>
          </div>

          <button
            className="verify-btn"
            disabled={loading || otp.join("").length !== 6}
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify OTP →"}
          </button>

          <div className="back" onClick={() => navigate("/login")}>
            ← Back to Login
          </div>

          <div className="support">
            Need help? <span>Contact Support</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;


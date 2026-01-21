import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./otp.css";
import { baseURL } from "../config";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, flow, fullName, password } = location.state || {};

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email || !flow) {
      navigate("/login");
    }
  }, [email, flow, navigate]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
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
      if (flow === "register") {
        const res = await fetch(`${baseURL}/auth/verify-register-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            full_name: fullName,
            password,
            otp: otpCode,
          }),
        });

        if (!res.ok) return alert("Invalid or expired OTP");
        navigate("/login");
      }

      if (flow === "forgot") {
        const res = await fetch(
          `${baseURL}/auth/verify-forgot-otp?email=${encodeURIComponent(
            email
          )}&otp=${otpCode}`,
          { method: "POST" }
        );

        if (!res.ok) return alert("Invalid or expired OTP");
        localStorage.setItem("reset_email", email);
        navigate("/reset-password");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="otp-container">
        <div className="otp-card">
          <div className="lock-icon">🔐</div>

          <h2>Verify OTP</h2>
          <p className="subtitle">
            We’ve sent a 6-digit code to <br />
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
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>

          <button
            className="verify-btn"
            disabled={loading}
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify OTP →"}
          </button>

          <div className="back-link" onClick={() => navigate("/login")}>
            ← Back to Login
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;

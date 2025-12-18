import { useState } from "react";
import api from "./services/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    await api.post("/auth/forgot-password", { email });
    alert("OTP sent");
    setStep(2);
  };

  const verifyOtp = async () => {
    await api.post("/auth/verify-otp", {
      email: email,
      otp: otp,
    });

    alert("OTP verified");
    setStep(3);
  };

  const resetPassword = async () => {
    await api.post("/auth/reset-password", {
      email,
      new_password: password,
    });
    alert("Password updated");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg w-[350px] shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} className="btn-primary w-full">
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} className="btn-primary w-full">
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              className="w-full border p-2 mb-3 rounded"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={resetPassword} className="btn-primary w-full">
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

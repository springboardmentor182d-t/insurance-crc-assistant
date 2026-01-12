import { useState } from "react";
import api from "./services/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtp = async () => {
    await api.post("/auth/password/forgot", { email });
    alert("OTP sent");
    setStep(2);
  };

  const verifyOtp = async () => {
    await api.post("/auth/password/verify-otp", { email, otp });
    alert("OTP verified");
    setStep(3);
  };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await api.post("/auth/password/reset", {
      email,
      new_password: password,
    });

    alert("Password updated successfully");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg w-[350px] shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 (UPDATED) */}
        {step === 3 && (
          <>
            <input
              type="password"
              className="w-full border p-2 mb-3 rounded"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-2 mb-3 rounded"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

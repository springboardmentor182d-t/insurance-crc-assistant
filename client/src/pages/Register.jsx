import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter email first");
      setType("error");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register/send-otp", { email });
      setOtpSent(true);
      setMessage("OTP sent to your email");
      setType("success");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Failed to send OTP");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      setType("error");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register/verify-otp", { email, otp });
      setOtpVerified(true);
      setMessage("OTP verified successfully");
      setType("success");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Invalid OTP");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setMessage("Please verify OTP first");
      setType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setType("error");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        mobile,
        password,
      });

      alert("Registration successful");
      navigate("/");
      setMessage("Registration successful");
      setType("success");

      setTimeout(() => {
        navigate("/LandingPage");
      }, 1200);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed");
      setType("error");
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-600">
       {/* LEFT ILLUSTRATION */}
      <div className="hidden md:flex w-2/5 bg-blue-50 items-center justify-center">
        <img
          src="/images/Register.png"
          alt="Register Illustration"
          className="max-w-md"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow-lg w-[450px] p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Create Account
          </h2>

          {message && (
            <div
              className={`mb-3 text-sm p-2 rounded ${
                type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="flex gap-2 mb-3">
            <input
              className="w-full border p-2 rounded"
              placeholder="Email"
              value={email}
              disabled={otpSent}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={sendOtp}
              disabled={loading || otpSent}
              className="bg-blue-500 text-white px-4 rounded"
            >
              {otpSent ? "Sent" : "Verify"}
            </button>
          </div>

          {/* EMAIL + OTP */}
          <div className="mb-3">
            <label className="block text-sm mb-1 text-gray-700">
              Email
            </label>
            <div className="flex gap-2">
              <input
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="eg.user@gmail.com"
                value={email}
                disabled={otpSent}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading || otpSent}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg text-sm"
              >
                {otpSent ? "Sent" : "Verify"}
              </button>
            </div>
          </div>

          {/* OTP FIELD */}
          {otpSent && (
            <div className="flex gap-2 mb-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={otpVerified}
                className="bg-green-500 text-white px-4 rounded"
              >
                {otpVerified ? "Verified" : "Verify"}
              </button>
            </div>
          )}

          {/* MOBILE */}
          <div className="mb-3">
            <label className="block text-sm mb-1 text-gray-700">
              Mobile
            </label>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="0000000000"
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="block text-sm mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="must contain 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-5">
            <label className="block text-sm mb-1 text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="must be same as above"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Mobile"
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-2 mb-3 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-2 mb-4 rounded"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={!otpVerified}
            className={`w-full py-2 rounded text-white ${
              otpVerified ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}







// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./services/api";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // SEND OTP
//   const sendOtp = async () => {
//     if (!email) {
//       alert("Please enter email first");
//       return;
//     }

//     try {
//       setLoading(true);
// <<<<<<< HEAD
//       // await api.post("/auth/register/send-otp", null, {
//       //   params: { email },
//       // });
// =======
// >>>>>>> 4790594d94780cbeb720105190214d29bef46674
//       await api.post("/auth/register/send-otp", { email });
//       setOtpSent(true);
//       alert("OTP sent to your email");
//     } catch (err) {
//       alert(err.response?.data?.detail || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // VERIFY OTP
//   const verifyOtp = async () => {
//     if (!otp) {
//       alert("Please enter OTP");
//       return;
//     }

//     try {
//       setLoading(true);
// <<<<<<< HEAD
//       // await api.post("/auth/register/verify-otp", null, {
//       //   params: { email, otp },
//       // });
// =======
// >>>>>>> 4790594d94780cbeb720105190214d29bef46674
//       await api.post("/auth/register/verify-otp", { email, otp });
//       setOtpVerified(true);
//       alert("OTP verified successfully");
//     } catch (err) {
//       alert(err.response?.data?.detail || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // REGISTER USER
//   const submit = async (e) => {
//     e.preventDefault();

//     if (!otpVerified) {
//       alert("Please verify OTP first");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       await api.post("/auth/register", {
//         name,
//         email,
//         mobile,
//         password,
//       });

//       alert("Registration successful");
//       navigate("/LandingPage");
//     } catch (err) {
//       alert(err.response?.data?.detail || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-blue-600">
//       {/* LEFT ILLUSTRATION */}
//       <div className="hidden md:flex w-2/5 bg-blue-50 items-center justify-center">
//         <img
//           src="/images/Register.png"
//           alt="Register Illustration"
//           className="max-w-md"
//         />
//       </div>

//       {/* RIGHT REGISTER CARD */}
//       <div className="w-full md:w-3/5 flex items-center justify-center">
//         <form
//           onSubmit={submit}
//           className="bg-[#fff5f5] rounded-xl shadow-lg w-[450px] p-8"
//         >
//           <h2 className="text-3xl font-bold text-center mb-6">
//             Create Account
//           </h2>

//           {/* FULL NAME */}
//           <div className="mb-3">
//             <label className="block text-sm mb-1 text-gray-700">
//               Full Name
//             </label>
//             <input
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Enter Full Name"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* EMAIL + OTP */}
//           <div className="mb-3">
//             <label className="block text-sm mb-1 text-gray-700">Email</label>
//             <div className="flex gap-2">
//               <input
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//                 placeholder="eg.user@gmail.com"
//                 value={email}
//                 disabled={otpSent}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 disabled={loading || otpSent}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg text-sm"
//               >
//                 {otpSent ? "Sent" : "Verify"}
//               </button>
//             </div>
//           </div>

//           {/* OTP FIELD */}
//           {otpSent && (
//             <div className="mb-3 flex gap-2">
//               <input
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value.trim())}
//               />
//               <button
//                 type="button"
//                 onClick={verifyOtp}
//                 disabled={loading || otpVerified || otp.length < 6}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg text-sm"
//               >
//                 {otpVerified ? "Verified" : "Verify"}
//               </button>
//             </div>
//           )}

//           {/* MOBILE */}
//           <div className="mb-3">
//             <label className="block text-sm mb-1 text-gray-700">Mobile</label>
//             <input
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="0000000000"
//               onChange={(e) => setMobile(e.target.value)}
//               required
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="mb-3">
//             <label className="block text-sm mb-1 text-gray-700">Password</label>
//             <input
//               type="password"
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="must contain 6 characters"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="mb-5">
//             <label className="block text-sm mb-1 text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="must be same as above"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* REGISTER BUTTON */}
//           <button
//             type="submit"
//             disabled={!otpVerified}
//             className={`w-full py-2 rounded-lg text-white font-semibold transition ${
//               otpVerified
//                 ? "bg-blue-500 hover:bg-blue-600"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//           >
//             Register
//           </button>

//           {/* LOGIN LINK */}
//           <p className="text-center text-sm mt-5">
//             Already Registered?{" "}
//             <Link to="/login" className="text-blue-600 font-semibold">
//               Login here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

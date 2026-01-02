import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageContainer from "./layout/PageContainer";

/* AUTH PAGES */
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

/* MAIN APP PAGES */
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import HealthRecommendation from "./pages/HealthRecommendation";
import MotorRecommendation from "./pages/MotorRecommendation";
import LifeRecommendation from "./pages/LifeRecommendation";
import TravelRecommendation from "./pages/TravelRecommendation";
import HomeRecommendation from "./pages/HomeRecommendation";
import BusinessRecommendation from "./pages/BusinessRecommendation";
import FireRecommendation from "./pages/FireRecommendation";
import ProfilePage from "./pages/ProfilePage";
import RecommendedPolicies from "./pages/RecommendedPolicies";

/* ADMIN */
import AdminDashboard from "./pages/AdminDashboard";

/* ROUTE GUARD */
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= PROTECTED USER ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PageContainer />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route
              path="/health_insurance_rec"
              element={<HealthRecommendation />}
            />
            <Route
              path="/motor_insurance_rec"
              element={<MotorRecommendation />}
            />
            <Route path="/life_insurance_rec" element={<LifeRecommendation />} />
            <Route
              path="/travel_insurance_rec"
              element={<TravelRecommendation />}
            />
            <Route
              path="/home_insurance_rec"
              element={<HomeRecommendation />}
            />
            <Route
              path="/business_insurance_rec"
              element={<BusinessRecommendation />}
            />
            <Route
              path="/fire_property_insurance_rec"
              element={<FireRecommendation />}
            />
            <Route
              path="/recommendedPolicies"
              element={<RecommendedPolicies />}
            />
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

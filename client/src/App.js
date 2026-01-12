import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

/* ===== Auth pages ===== */
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

/* ===== Layout & Main pages ===== */
import PageContainer from "./layout/PageContainer";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";

/* ===== Recommendation pages ===== */
import HealthRecommendation from "./pages/HealthRecommendation";
import MotorRecommendation from "./pages/MotorRecommendation";
import LifeRecommendation from "./pages/LifeRecommendation";
import TravelRecommendation from "./pages/TravelRecommendation";
import HomeRecommendation from "./pages/HomeRecommendation";
import BusinessRecommendation from "./pages/BusinessRecommendation";
import FireRecommendation from "./pages/FireRecommendation";

/* ===== Profile & Results ===== */
import ProfilePage from "./pages/ProfilePage";
import RecommendedPolicies from "./pages/RecommendedPolicies";
import TestFetch from "./pages/TestFetch";

import HealthRecResults from "./pages/HealthRecResults";
import LifeRecResults from "./pages/LifeRecResults";
import MotorRecResults from "./pages/MotorRecResults";
import HomeRecResults from "./pages/HomeRecResults";
import TravelRecResults from "./pages/TravelRecResults";
import FireRecResults from "./pages/FireRecResults";
import BusinessRecResults from "./pages/BusinessRecResults";

/* ===== Claims pages ===== */
import ClaimsDashboard from "./pages/ClaimsDashboard";
import StartNewClaim from "./pages/StartNewClaim";
import FileNewClaimStep1 from "./pages/FileNewClaimStep1";
import FileNewClaimStep2 from "./pages/FileNewClaimStep2";
import ReviewClaimStep3 from "./pages/ReviewClaimStep3";
import ClaimSubmission from "./pages/ClaimSubmission";
import ClaimStatus from "./pages/ClaimStatus";
import TrackClaim from "./pages/TrackClaim";

export default function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC AUTH ROUTES ================= */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ================= ADMIN PROTECTED ROUTE ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= MAIN APP ROUTES ================= */}
          <Route element={<PageContainer />}>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />

            {/* Recommendation forms */}
            <Route path="/health_insurance_rec" element={<HealthRecommendation />} />
            <Route path="/motor_insurance_rec" element={<MotorRecommendation />} />
            <Route path="/life_insurance_rec" element={<LifeRecommendation />} />
            <Route path="/travel_insurance_rec" element={<TravelRecommendation />} />
            <Route path="/home_insurance_rec" element={<HomeRecommendation />} />
            <Route path="/business_insurance_rec" element={<BusinessRecommendation />} />
            <Route path="/fire_property_insurance_rec" element={<FireRecommendation />} />

            {/* Profile & policies */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recommendedPolicies" element={<RecommendedPolicies />} />

            {/* Result pages */}
            <Route path="/healthrecresults" element={<HealthRecResults />} />
            <Route path="/liferecresults" element={<LifeRecResults />} />
            <Route path="/motorrecresults" element={<MotorRecResults />} />
            <Route path="/homerecresults" element={<HomeRecResults />} />
            <Route path="/travelrecresults" element={<TravelRecResults />} />
            <Route path="/firerecresults" element={<FireRecResults />} />
            <Route path="/businessrecresults" element={<BusinessRecResults />} />

            {/* ================= CLAIMS ROUTES ================= */}
            <Route path="/claims" element={<ClaimsDashboard />} />
            <Route path="/claims/start" element={<StartNewClaim />} />

            {/* Step-based flow */}
            <Route path="/claims/file/step1" element={<FileNewClaimStep1 />} />
            <Route path="/claims/file/step2" element={<FileNewClaimStep2 />} />
            <Route path="/claims/file/step3" element={<ReviewClaimStep3 />} />

            {/* ✅ Alias route for dashboard Review button */}
            <Route path="/claims/review" element={<ReviewClaimStep3 />} />

            {/* Submission & status */}
            <Route path="/claims/submitted" element={<ClaimSubmission />} />
            <Route path="/claims/status" element={<ClaimStatus />} />

            {/* Track claim */}
            <Route path="/claims/track/:id" element={<TrackClaim />} />

            {/* Testing */}
            <Route path="/test" element={<TestFetch />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

/* ===== Auth pages ===== */
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

/* ===== Admin pages ===== */
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminReports from "./admin/pages/AdminReports";
import AdminPolicyCatalog from "./admin/pages/AdminPolicyCatalog";

/* ===== Layout & Main pages ===== */
import PageContainer from "./layout/PageContainer";
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
import TestFetch from "./pages/TestFetch";

/* ===== Result pages ===== */
import HealthRecResults from "./pages/HealthRecResults";
import LifeRecResults from "./pages/LifeRecResults";
import MotorRecResults from "./pages/MotorRecResults";
import HomeRecResults from "./pages/HomeRecResults";
import TravelRecResults from "./pages/TravelRecResults";
import FireRecResults from "./pages/FireRecResults";
import BusinessRecResults from "./pages/BusinessRecResults";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ProfileProvider>
      <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
        <BrowserRouter>
          <Routes>
            {/* ===== Public Auth Routes ===== */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ===== Admin Protected Routes ===== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminDashboard
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                </ProtectedRoute>
              }
            >
              <Route path="users" element={<AdminUsers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="policies" element={<AdminPolicyCatalog />} />
            </Route>

            {/* ===== Main App Routes (User Layout) ===== */}
            <Route element={<PageContainer />}>
              <Route path="/" element={<Home />} />
              <Route path="/recommendations" element={<Recommendations />} />

              <Route
                path="/health_insurance_rec"
                element={<HealthRecommendation />}
              />
              <Route
                path="/motor_insurance_rec"
                element={<MotorRecommendation />}
              />
              <Route
                path="/life_insurance_rec"
                element={<LifeRecommendation />}
              />
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

              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/recommendedPolicies"
                element={<RecommendedPolicies />}
              />

              {/* Result pages */}
              <Route
                path="/healthrecresults"
                element={<HealthRecResults />}
              />
              <Route path="/liferecresults" element={<LifeRecResults />} />
              <Route
                path="/motorrecresults"
                element={<MotorRecResults />}
              />
              <Route path="/homerecresults" element={<HomeRecResults />} />
              <Route
                path="/travelrecresults"
                element={<TravelRecResults />}
              />
              <Route path="/firerecresults" element={<FireRecResults />} />
              <Route
                path="/businessrecresults"
                element={<BusinessRecResults />}
              />

              {/* Testing */}
              <Route path="/test" element={<TestFetch />} />
            </Route>

            {/* ===== Fallback ===== */}
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ProfileProvider>
  );
}

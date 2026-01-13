import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

/* ===== Fraud Rules Engine pages ===== */
import FraudRulesEngine from "./pages/FraudRulesEngine";
import CreateRule from "./pages/CreateRule";
import EditRule from "./pages/EditRule";
import RulePerformance from "./pages/RulePerformance";
import ClaimDetail from "./pages/ClaimDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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

            {/* ================= MAIN APP ROUTES (WITH LAYOUT) ================= */}
            <Route element={<PageContainer />}>
              <Route path="/" element={<Home />} />
              <Route path="/recommendations" element={<Recommendations />} />

              <Route path="/health_insurance_rec" element={<HealthRecommendation />} />
              <Route path="/motor_insurance_rec" element={<MotorRecommendation />} />
              <Route path="/life_insurance_rec" element={<LifeRecommendation />} />
              <Route path="/travel_insurance_rec" element={<TravelRecommendation />} />
              <Route path="/home_insurance_rec" element={<HomeRecommendation />} />
              <Route path="/business_insurance_rec" element={<BusinessRecommendation />} />
              <Route path="/fire_property_insurance_rec" element={<FireRecommendation />} />

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

              {/* Testing */}
              <Route path="/test" element={<TestFetch />} />
            </Route>

            {/* ================= FRAUD RULES ENGINE ROUTES ================= */}
            <Route path="/fraud-rules" element={<FraudRulesEngine />} />
            <Route path="/rules/create" element={<CreateRule />} />
            <Route path="/rules/:id/edit" element={<EditRule />} />
            <Route path="/rule-performance" element={<RulePerformance />} />
            <Route path="/claims/:id" element={<ClaimDetail />} />

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

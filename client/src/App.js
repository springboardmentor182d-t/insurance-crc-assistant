import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== Context ===== */
import { ProfileProvider } from "./context/ProfileContext";
import { CompareProvider } from "./context/CompareContext";

/* ===== Auth pages ===== */
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

/* ===== Admin layout & protection ===== */
import AdminLayout from "./admin/layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

/* ===== Admin pages ===== */
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminReports from "./admin/pages/AdminReports";
import AdminSupport from "./pages/AdminSupport";

/* ===== Admin policy pages ===== */
import PolicyManagement from "./pages/PolicyManagement";
import AddPolicy from "./pages/AddPolicy";
import PolicyDetails from "./pages/PolicyDetails";
import AdminPolicyCatalog from "./pages/AdminPolicyCatalog";
import EditPolicy from "./pages/EditPolicy";
import SavedPolicies from "./pages/SavedPolicies";

/* ===== Layout & User pages ===== */
import PageContainer from "./layout/PageContainer";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import PolicyCatalog from "./pages/PolicyCatalog";
import ProfilePage from "./pages/ProfilePage";
import RecommendedPolicies from "./pages/RecommendedPolicies";
import SavedQuotes from "./pages/SavedQuotes";

/* ===== Recommendation forms ===== */
import HealthRecommendation from "./pages/HealthRecommendation";
import MotorRecommendation from "./pages/MotorRecommendation";
import LifeRecommendation from "./pages/LifeRecommendation";
import TravelRecommendation from "./pages/TravelRecommendation";
import HomeRecommendation from "./pages/HomeRecommendation";
import BusinessRecommendation from "./pages/BusinessRecommendation";
import FireRecommendation from "./pages/FireRecommendation";

/* ===== Recommendation Results ===== */
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

/* ===== User policy details ===== */
import BusinessPolicyDetails from "./pages/BusinessPolicyDetails";
import LifePolicyDetails from "./pages/LifePolicyDetails";
import TravelPolicyDetails from "./pages/TravelPolicyDetails";
import HealthPolicyDetails from "./pages/HealthPolicyDetails";
import FirePolicyDetails from "./pages/FirePolicyDetails";
import HomePolicyDetails from "./pages/HomePolicyDetails";
import MotorPolicyDetails from "./pages/MotorPolicyDetails";

/* ===== Compare & Quote ===== */
import ComparePolicies from "./pages/ComparePolicies";
import QuoteSummary from "./pages/QuoteSummary";

/* ===== Testing ===== */
import TestFetch from "./pages/TestFetch";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ProfileProvider>
      <CompareProvider>
        <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
          <BrowserRouter>
            <Routes>

              {/* ===== AUTH ===== */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* ===== ADMIN (Protected + Layout) ===== */}
              <Route
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/reports" element={<AdminReports />} />

                <Route path="/admin/policies" element={<AdminPolicyCatalog />} />
                <Route path="/admin/policies/add" element={<AddPolicy />} />
                <Route path="/admin/policies/view/:id" element={<PolicyDetails />} />
                <Route path="/admin/policies/:id/edit" element={<EditPolicy />} />
                <Route path="/admin/policies/view/savedpolicies" element={<SavedPolicies />} />
                <Route path="/admin/policies/support" element={<AdminSupport />} />
              </Route>



              {/* ===== USER APP ===== */}
              <Route element={<PageContainer />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<PolicyCatalog />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/saved-quotes" element={<SavedQuotes />} />

                <Route path="/recommendations" element={<Recommendations />} />
                <Route
                  path="/recommendedPolicies"
                  element={<RecommendedPolicies />}
                />

                {/* Recommendation forms */}
                <Route path="/health_insurance_rec" element={<HealthRecommendation />} />
                <Route path="/motor_insurance_rec" element={<MotorRecommendation />} />
                <Route path="/life_insurance_rec" element={<LifeRecommendation />} />
                <Route path="/travel_insurance_rec" element={<TravelRecommendation />} />
                <Route path="/home_insurance_rec" element={<HomeRecommendation />} />
                <Route path="/business_insurance_rec" element={<BusinessRecommendation />} />
                <Route path="/fire_property_insurance_rec" element={<FireRecommendation />} />

                {/* Recommendation results */}
                <Route path="/healthrecresults" element={<HealthRecResults />} />
                <Route path="/liferecresults" element={<LifeRecResults />} />
                <Route path="/motorrecresults" element={<MotorRecResults />} />
                <Route path="/homerecresults" element={<HomeRecResults />} />
                <Route path="/travelrecresults" element={<TravelRecResults />} />
                <Route path="/firerecresults" element={<FireRecResults />} />
                <Route path="/businessrecresults" element={<BusinessRecResults />} />

                {/* Policy details (user side) */}
                <Route path="/policies/health/:id" element={<HealthPolicyDetails />} />
                <Route path="/policies/motor/:id" element={<MotorPolicyDetails />} />
                <Route path="/policies/life/:id" element={<LifePolicyDetails />} />
                <Route path="/policies/home/:id" element={<HomePolicyDetails />} />
                <Route path="/policies/travel/:id" element={<TravelPolicyDetails />} />
                <Route path="/policies/business/:id" element={<BusinessPolicyDetails />} />
                <Route path="/policies/fire/:id" element={<FirePolicyDetails />} />

                {/* Claims */}
                <Route path="/claims" element={<ClaimsDashboard />} />
                <Route path="/claims/start" element={<StartNewClaim />} />
                <Route path="/claims/file/step1" element={<FileNewClaimStep1 />} />
                <Route path="/claims/file/step2" element={<FileNewClaimStep2 />} />
                <Route path="/claims/file/step3" element={<ReviewClaimStep3 />} />
                <Route path="/claims/submitted" element={<ClaimSubmission />} />
                <Route path="/claims/status" element={<ClaimStatus />} />
                <Route path="/claims/track/:id" element={<TrackClaim />} />

                {/* Compare */}
                <Route path="/compare" element={<ComparePolicies />} />
                <Route path="/quote-summary" element={<QuoteSummary />} />

                {/* Test */}
                <Route path="/test" element={<TestFetch />} />
              </Route>

              {/* ===== FALLBACK ===== */}
              <Route path="*" element={<h1>Page Not Found</h1>} />

            </Routes>
          </BrowserRouter>
        </div>
      </CompareProvider>
    </ProfileProvider>
  );
}

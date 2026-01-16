import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import { CompareProvider } from "./context/CompareContext";

/* ===== AUTH PAGES ===== */
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

/* ===== PROTECTED ROUTE ===== */
import ProtectedRoute from "./components/ProtectedRoute";

/* ===== USER LAYOUT & PAGES ===== */
import PageContainer from "./layout/PageContainer";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import PolicyCatalog from "./pages/PolicyCatalog";
import ProfilePage from "./pages/ProfilePage";
import RecommendedPolicies from "./pages/RecommendedPolicies";
import SavedQuotes from "./pages/SavedQuotes";

/* ===== CLAIMS ===== */
import ClaimsDashboard from "./pages/ClaimsDashboard";
import StartNewClaim from "./pages/StartNewClaim";
import FileNewClaimStep1 from "./pages/FileNewClaimStep1";
import FileNewClaimStep2 from "./pages/FileNewClaimStep2";
import ReviewClaimStep3 from "./pages/ReviewClaimStep3";
import ClaimSubmission from "./pages/ClaimSubmission";
import ClaimStatus from "./pages/ClaimStatus";
import TrackClaim from "./pages/TrackClaim";

/* ===== ADMIN ===== */
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AdminPolicies from "./pages/AdminPolicies";
import FlaggedClaims from "./pages/FlaggedClaims";
import FraudRulesEngine from "./pages/FraudRulesEngine";
import EditFraudRule from "./pages/EditFraudRule";
import CreateFraudRule from "./pages/CreateFraudRule";
import InvestigateClaim from "./pages/InvestigateClaim";
import Investigations from "./pages/Investigations"
/* ===== TEST ===== */
import TestFetch from "./pages/TestFetch";

export default function App() {
  return (
    <ProfileProvider>
      <CompareProvider>
        <BrowserRouter>
          <Routes>

            {/* ================= PUBLIC AUTH ================= */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ================= ADMIN (PROTECTED) ================= */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="policies" element={<AdminPolicies />} />

            <Route path="flagged-claims" element={<FlaggedClaims />} />
            <Route path="flagged-claims/:claimId/investigate" element={<InvestigateClaim />} />

            <Route path="fraud-rules" element={<FraudRulesEngine />} />
            <Route path="fraud-rules/new" element={<CreateFraudRule />} />
            <Route path="fraud-rules/:id/edit" element={<EditFraudRule />} />
            <Route path="investigations" element={<Investigations />} />
          </Route>


            {/* ================= USER APP (PROTECTED) ================= */}
            <Route
              element={
                <ProtectedRoute>
                  <PageContainer />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<PolicyCatalog />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/saved-quotes" element={<SavedQuotes />} />

              <Route path="/recommendations" element={<Recommendations />} />
              <Route
                path="/recommendedPolicies"
                element={<RecommendedPolicies />}
              />

              {/* Claims */}
              <Route path="/claims" element={<ClaimsDashboard />} />
              <Route path="/claims/start" element={<StartNewClaim />} />
              <Route
                path="/claims/file/step1"
                element={<FileNewClaimStep1 />}
              />
              <Route
                path="/claims/file/step2"
                element={<FileNewClaimStep2 />}
              />
              <Route
                path="/claims/file/step3"
                element={<ReviewClaimStep3 />}
              />
              <Route
                path="/claims/submitted"
                element={<ClaimSubmission />}
              />
              <Route path="/claims/status" element={<ClaimStatus />} />
              <Route path="/claims/track/:id" element={<TrackClaim />} />

              {/* Test */}
              <Route path="/test" element={<TestFetch />} />
            </Route>

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<h1>Page Not Found</h1>} />

          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </ProfileProvider>
  );
}

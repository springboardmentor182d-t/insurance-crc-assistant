import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageContainer from "./layout/PageContainer";
import Home from "./pages/Home";   // used for UserDashboard
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

// inside <Routes>:
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITH sidebar & navbar */}
        {/* <Route path="/dashboard" element={<UserDashboard />} />  */}
        <Route element={<PageContainer />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<UserDashboard />} />  */}
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
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
          <Route
            path="/recommendedPolicies"
            element={<RecommendedPolicies />}
          />
          <Route path="/test" element={<TestFetch />} />
        </Route>
        

        {/* Fallback */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}


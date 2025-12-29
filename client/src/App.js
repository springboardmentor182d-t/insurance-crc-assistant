import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

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

import HealthRecResults from "./pages/HealthRecResults";
import LifeRecResults from "./pages/LifeRecResults";
import MotorRecResults from "./pages/MotorRecResults";
import HomeRecResults from "./pages/HomeRecResults";
import TravelRecResults from "./pages/TravelRecResults";
import FireRecResults from "./pages/FireRecResults";
import BusinessRecResults from "./pages/BusinessRecResults";

export default function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          {/* Pages WITH sidebar & navbar */}
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

            <Route path="/healthrecresults" element={<HealthRecResults />} />
            <Route path="/liferecresults" element={<LifeRecResults />} />
            <Route path="/motorrecresults" element={<MotorRecResults />} />
            <Route path="/homerecresults" element={<HomeRecResults />} />
            <Route path="/travelrecresults" element={<TravelRecResults />} />
            <Route path="/firerecresults" element={<FireRecResults />} />
            <Route
              path="/businessrecresults"
              element={<BusinessRecResults />}
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

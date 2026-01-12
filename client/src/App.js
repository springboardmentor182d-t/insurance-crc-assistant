import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landingpage";
import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import Policies from "./features/policies/Policies";

import { ComparePage } from "./pages/Comparsion";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/policycatalog" element={<PolicyCatalog />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policies/details/:id" element={<PolicyDetails />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route
          path="/premium-calculator"
          element={<PremiumCalculator />}
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* User */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/preferences" element={<Preferences />} />

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 32 }}>Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;









// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// <<<<<<< HEAD

// import { ComparePage } from "./pages/Comparsion";
// import Profile from "./pages/Profile";
// import Preferences from "./pages/Preferences";

// import Dashboard from "./pages/Dashboard";
// =======


// import LandingPage from "./pages/Landingpage";
// >>>>>>> 4790594d94780cbeb720105190214d29bef46674
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";

// import PolicyCatalog from "./pages/PolicyCatalog";
// import PolicyDetails from "./pages/PolicyDetails";
// import PremiumCalculator from "./pages/PremiumCalculator";
// import Policies from "./features/policies/Policies";
// import "./index.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
// <<<<<<< HEAD
//         <Route path="/" element={<PolicyCatalog />} />
//         <Route path="/compare" element={<ComparePage />} />
// =======
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/policycatalog" element={<PolicyCatalog />} />
//         <Route path="/compare" element={<Comparsion />} />
// >>>>>>> 4790594d94780cbeb720105190214d29bef46674
//         <Route path="/policies" element={<Policies />} />
//         <Route path="/policies/details/:id" element={<PolicyDetails />} />

// <<<<<<< HEAD
//         <Route path="/premium-calculator" element={<PremiumCalculator />} />

// =======
//         <Route
//           path="*"
//           element={<div style={{ padding: 32 }}>Page Not Found</div>}
//         />
//         <Route
//           path="/premium-calculator"
//           element={<PremiumCalculator />}
//         />
// >>>>>>> 4790594d94780cbeb720105190214d29bef46674
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/profile" element={<Profile />} />
//         <Route path="/preferences" element={<Preferences />} />

//         <Route
//           path="*"
//           element={<div style={{ padding: 32 }}>Page Not Found</div>}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { ComparePage } from "./pages/Comparsion";
// <<<<<<< HEAD
// import Profile from "./pages/Profile";
// import Preferences from "./pages/Preferences";
// =======
// >>>>>>> origin/main-group-B
// import Dashboard from "./pages/Dashboard";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";


// import PolicyCatalog from "./pages/PolicyCatalog";
// import PolicyDetails from "./pages/PolicyDetails";
// import PremiumCalculator from "./pages/PremiumCalculator";
// import Policies from "./features/policies/Policies";

// import "./index.css";
// function App() {
//   return (
//     <Router>
//       <Routes>


//         <Route path="/" element={<PolicyCatalog />} />
       
//         <Route path="/compare" element={<ComparePage />} />
//         <Route path="/policies" element={<Policies />} />
//         <Route path="/policy-details/:id" element={<PolicyDetails />} />

//       <Route
//           path="*"
//           element={<div style={{ padding: 32 }}>Page Not Found</div>}
//         />
//         <Route
//           path="/premium-calculator"
//           element={<PremiumCalculator />}
//         />
        
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
// <<<<<<< HEAD

//           <Route path="/profile" element={<Profile />} />
//            <Route path="/preferences" element={<Preferences />} />
// =======
//         <Route
//           path="*"
//           element={<div style={{ padding: 32 }}>Page Not Found</div>}
//         />
// >>>>>>> origin/main-group-B
//       </Routes>
//     </Router>
//   );
// }

// export default App;
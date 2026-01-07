import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ComparePage } from "./pages/Comparsion";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import Policies from "./features/policies/Policies";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PolicyCatalog />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policy-details/:id" element={<PolicyDetails />} />

        <Route path="/premium-calculator" element={<PremiumCalculator />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/preferences" element={<Preferences />} />

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
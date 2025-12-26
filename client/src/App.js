import { BrowserRouter, Routes, Route } from "react-router-dom";
import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";
import Policies from "./features/policies/Policies";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PolicyCatalog />} />
        <Route path="/policy-details/:id" element={<PolicyDetails />} />
        <Route path="/premium-calculator" element={<PremiumCalculator />} />
        <Route path="/policies" element={<Policies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

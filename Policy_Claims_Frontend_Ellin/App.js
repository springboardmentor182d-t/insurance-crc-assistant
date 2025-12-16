import { BrowserRouter, Routes, Route } from "react-router-dom";
import PolicyCatalog from "./pages/PolicyCatalog";
import PolicyDetails from "./pages/PolicyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PolicyCatalog />} />
        <Route path="/policy-details/:id" element={<PolicyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

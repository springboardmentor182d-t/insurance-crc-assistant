import { Routes, Route } from "react-router-dom";
import ClaimsList from "./pages/ClaimsList";
import ClaimDetails from "./pages/ClaimDetails";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<ClaimsList />} />
      <Route path="/claims/:id" element={<ClaimDetails />} />
      
    </Routes>
     
     </div>
  );
}

export default App;

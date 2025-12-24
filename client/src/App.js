import { Routes, Route } from "react-router-dom";
import ClaimsList from "./pages/ClaimsList";
import ClaimDetails from "./pages/ClaimDetails";
import FileClaim from "./pages/FileClaim"; 
import IncidentDetails from "./pages/IncidentDetails";
import UploadDocuments from "./pages/UploadDocuments";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<ClaimsList />} />
      <Route path="/claims/:id" element={<ClaimDetails />} />
      <Route path="/file-claim" element={<FileClaim />} />
      <Route path="/claims/incident" element={<IncidentDetails />} />
      <Route path="/claims/upload" element={<UploadDocuments/>}/>

      
    </Routes>
     
     </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import AdminHome from "../pages/admin/Home";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminHome />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminHome />} />
        {/* Add more admin pages here */}
      </Route>
    </Routes>
  );
}
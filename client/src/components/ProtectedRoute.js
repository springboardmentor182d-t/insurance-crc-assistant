import { Navigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const ProtectedRoute = ({ children, role }) => {
  const { token, role: userRole } = useProfile();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import { useEffect, useState } from "react";
import { fetchDashboardData } from "../features/authentication/services/dashboardApi";
import { useProfile } from "../context/ProfileContext";
import NewUserDashboard from "../components/dashboard/NewUserDashboard";
import ExistingUserDashboard from "../components/dashboard/ExistingUserDashboard";

export default function Dashboard() {
  const { token } = useProfile();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  const getUserIdFromToken = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id;
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    if (!userId) return;

    fetchDashboardData(userId)
      .then(setDashboard)
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  // 🆕 New user (no profile yet)
  if (!dashboard.profile) {
    return <NewUserDashboard />;
  }

  // ✅ Existing user
  return <ExistingUserDashboard dashboard={dashboard} />;
}

import Sidebar from "../../components/sidebar/UserSidebar";
import Topbar from "../../components/Topbar";
import PremiumChart from "../../components/PremiumChart";
import ProfileSummary from "../../components/ProfileSummary";
import MyPolicies from "../../components/MyPolicies";
import Recommended from "../../components/Recommended";


const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Top Section: Premium Chart + Profile Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow">
              <PremiumChart />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <ProfileSummary />
            </div>
          </div>

          {/* Bottom Section: My Policies + Recommended */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow">
              <MyPolicies />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <Recommended />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
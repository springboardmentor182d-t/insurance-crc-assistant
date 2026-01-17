import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile
} from "../features/authentication/profile/services/profileApi";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

import { Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: ""
  });

  useEffect(() => {
    getProfile().then((res) => setProfile(res.data));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-white-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* CENTER CONTENT */}
        <div className="flex justify-center py-10">
          <div className="w-full max-w-4xl">

            {/* PROFILE HEADER */}
            <div className="flex flex-col items-center mb-8">
              <img
                src="https://img.icons8.com/color/80/gender-neutral-user.png"
                alt="profile"
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h2 className="text-xl font-semibold">{profile.name || "User"}</h2>
              
            </div>

            {/* CARD */}
            <div className="bg-white-100 rounded-xl shadow p-8">
              <h3 className="text-lg font-semibold mb-1">Personal Details</h3>
              <p className="text-sm text-gray-500 mb-6">
                Update your personal information and contact details.
              </p>

              {/* FORM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                    placeholder="Full Name"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-lg pl-10 py-2"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-lg pl-10 py-2"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                {/* DOB */}
                <div>
                  <label className="text-sm text-gray-600">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="dob"
                      value={profile.dob || ""}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-lg pl-10 py-2"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="w-full mt-1 border rounded-lg pl-10 py-2"
                      rows="3"
                      placeholder="Address"
                    />
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end items-center gap-4 mt-8">
                <button className="text-sm text-blue-600 hover:underline">
                  Change Password
                </button>

                <button className="px-4 py-2 border rounded-lg text-sm">
                  Cancel
                </button>

                <button
                  onClick={() => updateProfile(profile)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

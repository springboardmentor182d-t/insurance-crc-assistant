import React from "react";

const AdminHome = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome, Admin! This is your home page.
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
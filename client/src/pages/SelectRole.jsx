import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Insure Assist</h1>
        <p className="text-gray-500">Choose how you want to login</p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium"
        >
          Login as Admin
        </button>

        <button
          onClick={() => {
            localStorage.setItem("role", "user");
            navigate("/user/dashboard");
          }}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium"
        >
          Login as User
        </button>
      </div>
    </div>
  );
}

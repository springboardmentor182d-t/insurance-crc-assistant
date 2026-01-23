import { useNavigate } from "react-router-dom";

export default function ClaimsTable({ claims = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between h-full">
      {/* TEXT CONTENT */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Claims
        </h2>

        <p className="text-sm text-gray-500">
          {claims.length > 0
            ? `You have ${claims.length} claim${claims.length > 1 ? "s" : ""} filed.`
            : "You have not filed any claims yet."}
        </p>

        <p className="text-small text-gray-400 mt-2">
          Track status, upload documents, or review submitted claims.
        </p>
      </div>

      {/* BUTTON */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/claims")}
          className="mx-auto block bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          View your claims →
        </button>
      </div>
    </div>
  );
}

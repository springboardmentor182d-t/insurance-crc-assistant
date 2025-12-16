import { Link } from "react-router-dom";

const PolicyCard = ({ policy }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">

      {/* Badge */}
      <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
        {policy.type}
      </span>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {policy.title}
      </h3>

      {/* Coverage */}
      <p className="text-sm text-gray-600 mt-2">
        {policy.coverage}
      </p>

      {/* Premium */}
      <div className="mt-4 text-2xl font-bold text-blue-600">
        ₹{policy.premium}
        <span className="text-sm text-gray-500"> / month</span>
      </div>

      {/* Button */}
      <Link
        to={`/policies/${policy.id}`}
        className="mt-6 block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>

    </div>
  );
};

export default PolicyCard;

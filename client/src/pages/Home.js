
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <Link
        to="/recommendations"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Go to Recommendations
      </Link>
    </div>
  );
}

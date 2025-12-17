import React, { useEffect, useState } from "react";
import { Heart, Shield, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconMap = {
  Health: Heart,
  Life: Shield,
  Auto: Car,
};

const Recommendations = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recommendations")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to load recommendations");
    }
    return res.json();
  })
  .then((json) => setData(json))
  .catch((err) => {
    console.error(err);
    alert("Error loading recommendations");
  });

  }, []);

  if (!data) {
    return (
      <div className="p-10 text-center">
        Loading recommendations...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-8 py-10">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold mb-2">
            Recommended For You
          </h1>
          <p className="text-gray-500">
            Based on your preferences and profile
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-blue-50 rounded-xl p-6 flex justify-around text-center mb-10">
          <div>
            <p className="text-blue-600 text-xl font-semibold">
              {data.total}
            </p>
            <p className="text-gray-600">Policies Matched</p>
          </div>
          <div>
            <p className="text-green-600 text-xl font-semibold">
              ₹ 10,000
            </p>
            <p className="text-gray-600">Potential Savings</p>
          </div>
          <div>
            <p className="text-orange-500 text-xl font-semibold">
              {data.avg_match}%
            </p>
            <p className="text-gray-600">Avg Match Score</p>
          </div>
        </div>

        {/* CARDS */}
        <div className="space-y-8">
          {data.recommendations.map((item, index) => {
            const Icon = iconMap[item.type] || Heart;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow flex overflow-hidden"
              >
                {/* MATCH */}
                <div className="w-40 bg-gray-50 flex flex-col items-center justify-center gap-2">
                  {index === 0 && (
                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                      Best Match
                    </span>
                  )}
                  <div className="w-20 h-20 rounded-full border-8 border-orange-400 flex items-center justify-center font-semibold">
                    {item.match}%
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {item.provider}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Info
                      label="Annual Premium"
                      value={`₹ ${item.premium}`}
                    />
                    <Info
                      label="Coverage"
                      value={`₹ ${item.coverage}`}
                    />
                    <Info
                      label="Savings"
                      value={`₹ ${item.savings}`}
                    />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="w-56 p-6 flex flex-col justify-center gap-3">
                  <button className="bg-blue-600 text-white py-2 rounded-lg">
                    View Details
                  </button>
                  <button className="border border-blue-600 text-blue-600 py-2 rounded-lg">
                    Compare
                  </button>
                  <button className="text-sm text-gray-500">
                    Save for Later
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Not finding what you're looking for?
          </p>
          <button
            onClick={() => navigate("/preferences")}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg"
          >
            Update Preferences
          </button>
        </div>
      </main>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default Recommendations;

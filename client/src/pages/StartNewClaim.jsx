import React from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    step: 1,
    title: "Incident Details",
    desc: "Enter information about the incident and select the policy and type of claim.",
    active: true,
  },
  {
    step: 2,
    title: "Upload Documents",
    desc: "Provide supporting documents, such as medical bills, police reports, or photographs.",
    active: false,
  },
  {
    step: 3,
    title: "Review & Submit",
    desc: "Review the information, make any necessary changes, and submit your claim.",
    active: false,
  },
];

const StartNewClaim = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Start New Claim
      </h1>

      {/* Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow">
        <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
          Start your claim process
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          What You Need to Do
        </p>

        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-green-500">✔</span>
            Provide incident details
          </li>
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-green-500">✔</span>
            Upload supporting documents
          </li>
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-green-500">✔</span>
            Review and submit your claim
          </li>
        </ul>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {steps.map((item) => (
          <div
            key={item.step}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center ${
              item.active ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <div
              className={`mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-lg font-semibold ${
                item.active
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
              }`}
            >
              {item.step}
            </div>

            <h3 className="font-medium mb-2 dark:text-gray-100">
              Step {item.step}: {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/claims")}
          className="px-6 py-2 border rounded-lg text-gray-600 dark:text-gray-300
                     hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ← Back
        </button>

        <button
          onClick={() => navigate("/claims/file/step1")}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default StartNewClaim;

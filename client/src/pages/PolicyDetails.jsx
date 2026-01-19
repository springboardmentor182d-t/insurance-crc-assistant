import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PolicyDetails = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch policy details
  useEffect(() => {
    fetch(`${BASE_URL}/api/policies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Policy not found");
        return res.json();
      })
      .then((data) => setPolicy(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!policy) return <p className="p-8">Loading policy details...</p>;

  // 🔹 Premium calculation
  const calculatePremium = () => {
    // Safely convert coverage_amount to number
    const coverageValue = Number((policy.coverage_amount || 0).toString().replace(/,/g, ""));
    let premium = coverageValue * 0.01;

    if (policy.policy_type.includes("Health")) premium += 500;
    if (policy.policy_type.includes("Travel")) premium += 300;
    if (policy.policy_type.includes("Accident")) premium += 200;

    if (policy.payment_frequency === "Monthly") premium /= 12;

    return Math.round(premium);
  };

  // 🔹 Buy plan
  const handleBuyPlan = () => {
    try {
      setPurchased(true);
      setSuccessMsg(`Plan "${policy.title}" added successfully`);

      // 🔔 refresh bell instantly
      localStorage.setItem("notify_refresh", Date.now());

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50 min-h-screen p-8">
        <h1 className="text-2xl font-semibold mb-2">Policy Details</h1>
        <p className="text-gray-500 mb-6">Home / My Policies / Policy Details</p>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Top */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold">{policy.title}</h2>
            <p className="mt-2 text-gray-700">Policy Number</p>
            <p className="font-medium">{policy.policy_number}</p>

            <span className="inline-block mt-3 bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
              ACTIVE
            </span>

            <p className="mt-4 text-gray-700">
              Payment Frequency: <b>{policy.payment_frequency}</b>
            </p>
          </div>

          {/* Right Top */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Detailed Policy Information</h2>

            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
              <span>Policy Type</span>
              <span>{policy.policy_type}</span>

              <span>Coverage Amount</span>
              <span>{policy.coverage_amount}</span>
            </div>
          </div>

          {/* Left Bottom */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Coverage & Benefits</h2>

            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
              <span>Hospital Cover</span>
              <span>{policy.coverage_amount}</span>

              <span>Accidental Cover</span>
              <span>Included</span>

              <span>Critical Illness</span>
              <span>Included</span>
            </div>

            <hr className="my-4" />

            <div>
              <div className="flex justify-between font-semibold">
                <span>Estimated Premium</span>
                <span>₹ {calculatePremium()}</span>
              </div>

              {!purchased ? (
                <div className="mt-2">
                  {successMsg && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-sm">
                      {successMsg}
                    </div>
                  )}
                  <button
                    onClick={handleBuyPlan}
                    className="inline-block bg-blue-600 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-700 transition"
                  >
                    Add Plan
                  </button>
                </div>
              ) : (
                <span className="mt-2 inline-block bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                  PURCHASED
                </span>
              )}
            </div>
          </div>

          {/* Right Bottom */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <ul className="space-y-3 text-blue-600 font-medium">
              <li>📄 Policy Document PDF</li>
              <li>📄 Terms & Conditions</li>
              <li>📄 Claim Form</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyDetails;

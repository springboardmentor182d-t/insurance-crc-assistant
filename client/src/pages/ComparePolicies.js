import React from "react";
import { Heart, Shield } from "lucide-react";

export default function ComparePolicies() {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Compare Policies</h1>
          <p className="text-slate-500">
            Side-by-side comparison of selected policies
          </p>
        </div>
        <button className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
          Add More
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Health Policy */}
        <div className="bg-pink-50 rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">
            Health Shield Pro
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            SecureLife Insurance
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Buy Now
          </button>
        </div>

        {/* Life Policy */}
        <div className="bg-blue-50 rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">
            Life Protect Plus
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            Guardian Insurance
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Buy Now
          </button>
        </div>

        {/* Add Policy */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white">
          <div className="text-3xl text-slate-400 mb-2">+</div>
          <p className="text-slate-600 mb-3">Add policy to compare</p>
          <button className="border border-blue-500 text-blue-600 px-5 py-2 rounded-full text-sm font-medium">
            Browse Policies
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4 font-semibold">Annual Premium</td>
              <td className="px-6 py-4 text-center bg-yellow-50 font-bold">
                ₹ 15,000
              </td>
              <td className="px-6 py-4 text-center bg-yellow-50 font-bold">
                ₹ 25,000
              </td>
              <td className="px-6 py-4 text-center text-gray-400">—</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-semibold">Sum Insured</td>
              <td className="px-6 py-4 text-center bg-yellow-50 font-bold">
                ₹ 5,00,000
              </td>
              <td className="px-6 py-4 text-center bg-yellow-50 font-bold text-orange-500">
                ₹ 20,00,000
              </td>
              <td className="px-6 py-4 text-center text-gray-400">—</td>
            </tr>

            <tr className="border-t bg-slate-50">
              <td className="px-6 py-4 font-medium">Cashless Hospitals</td>
              <td className="px-6 py-4 text-center text-slate-600">
                5000+
              </td>
              <td className="px-6 py-4 text-center text-slate-600">
                3000+
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Waiting Period</td>
              <td className="px-6 py-4 text-center text-slate-600">
                30 Days
              </td>
              <td className="px-6 py-4 text-center text-slate-600">
                60 Days
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t bg-slate-50">
              <td className="px-6 py-4 font-medium">Claim Settlement</td>
              <td className="px-6 py-4 text-center text-slate-600">
                95%
              </td>
              <td className="px-6 py-4 text-center text-slate-600">
                90%
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">
                Pre-existing Coverage
              </td>
              <td className="px-6 py-4 text-center text-slate-600">
                After 3 Years
              </td>
              <td className="px-6 py-4 text-center text-slate-600">
                After 4 Years
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t bg-slate-50">
              <td className="px-6 py-4 font-medium">Room Rent Limit</td>
              <td className="px-6 py-4 text-center text-slate-600">
                No Limit
              </td>
              <td className="px-6 py-4 text-center text-slate-600">
                1% of SI
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">
                Day Care Procedures
              </td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                ✓
              </td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                ✓
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t bg-slate-50">
              <td className="px-6 py-4 font-medium">Ambulance Cover</td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                ✓
              </td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                ✓
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Health Check-up</td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                ✓
              </td>
              <td className="px-6 py-4 text-center text-red-500 font-bold">
                ✕
              </td>
              <td className="px-6 py-4 text-center text-gray-400">
                —
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

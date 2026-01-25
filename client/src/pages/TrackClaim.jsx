import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../config";

const TrackClaim = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const res = await fetch(`${baseURL}/claims/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch claim");

        const data = await res.json();
        setClaim(data);
      } catch (err) {
        console.error(err);
        alert("Error loading claim details");
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading claim details…
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">
        Claim not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-slate-950 text-slate-200">
      {/* HEADER */}
      <button
        onClick={() => navigate("/claims")}
        className="text-purple-400 hover:text-purple-300 mb-6 transition"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Claim #{claim.id}
        </h1>

        <p className="text-sm text-slate-400 mb-8">
          {claim.policy} · {claim.claim_type}
        </p>

        {/* CLAIM INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <p className="text-xs text-slate-500 mb-1">
              INCIDENT DATE
            </p>
            <p className="font-medium text-white">
              {claim.incident_date}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">
              AMOUNT CLAIMED
            </p>
            <p className="font-medium text-white">
              ₹{claim.amount_claimed}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">
              STATUS
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium">
              {claim.status}
            </span>
          </div>
        </div>

        {/* TIMELINE */}
        <div>
          <h3 className="font-medium mb-6 text-white">
            Claim Timeline
          </h3>

          <ul className="space-y-6 text-sm">
            <li className="flex gap-4">
              <span className="w-3 h-3 mt-1 bg-purple-500 rounded-full"></span>
              <div>
                <p className="font-medium text-white">
                  Claim Submitted
                </p>
                <p className="text-slate-400">
                  Your claim has been submitted successfully.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="w-3 h-3 mt-1 bg-slate-600 rounded-full"></span>
              <div>
                <p className="font-medium text-slate-300">
                  Under Review
                </p>
                <p className="text-slate-500">
                  Our team is reviewing your claim documents.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="w-3 h-3 mt-1 bg-slate-600 rounded-full"></span>
              <div>
                <p className="font-medium text-slate-300">
                  Final Decision
                </p>
                <p className="text-slate-500">
                  You will be notified once a decision is made.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate("/claims")}
            className="
              px-6 py-2 rounded-xl
              border border-slate-700
              text-slate-300
              hover:bg-slate-800 transition
            "
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackClaim;

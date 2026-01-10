import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { getPolicyById } from "../../api/policiesApi";
import { useCompare } from "../../context/CompareContext";

import PolicyIllustration from "../../components/policies/PolicyIllustration";
import CoverageDetails from "../../components/policies/CoverageDetails";
import BenefitsList from "../../components/policies/BenefitsList";
import ExclusionsList from "../../components/policies/ExclusionsList";
import PolicyScore from "../../components/policies/PolicyScore";
import ProviderRating from "../../components/policies/ProviderRating";

/* ===============================
   HELPERS
================================ */
const formatINR = (value) =>
  value == null ? "N/A" : Number(value).toLocaleString("en-IN");

export default function PolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCompare, removeFromCompare, selected } = useCompare();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH POLICY ---------- */
  useEffect(() => {
    getPolicyById(id)
      .then(setPolicy)
      .catch(() => setPolicy(null))
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------- STATES ---------- */
  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading policy details...
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-3">
          Policy not found or unavailable
        </p>
        <button
          onClick={() => navigate("/policies")}
          className="text-blue-600 underline"
        >
          Back to Policy Catalog
        </button>
      </div>
    );
  }

  /* ===============================
     COMPARE LOGIC
  =============================== */
  const isCompared = selected.some(
    (p) => p.id === policy.id
  );

  const handleCompare = () => {
    if (isCompared) {
      removeFromCompare(policy.id);
    } else {
      addToCompare(policy); // ✅ normalization handled in context
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* BACK */}
      <button
        onClick={() => navigate("/policies")}
        className="text-sm text-blue-600 mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Catalog
      </button>

      {/* ================= TOP SUMMARY ================= */}
      <div className="bg-white rounded-2xl border shadow-sm flex overflow-hidden mb-8">
        <div className="flex-1 p-6">
          <h1 className="text-xl font-semibold">
            {policy.name ?? "Policy"}
          </h1>
          <p className="text-sm text-slate-500 mb-4">
            {policy.provider ?? "—"}
          </p>

          <div className="flex gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl px-4 py-3">
              <p className="text-xs text-slate-500">
                Annual Premium
              </p>
              <p className="font-semibold text-blue-600">
                ₹ {formatINR(policy.premium)}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl px-4 py-3">
              <p className="text-xs text-slate-500">
                Sum Insured
              </p>
              <p className="font-semibold text-green-600">
                ₹ {formatINR(policy.coverage)}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={handleCompare}
              className={`px-5 py-2 rounded-lg text-sm border transition
                ${
                  isCompared
                    ? "bg-red-50 border-red-400 text-red-600 hover:bg-red-100"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
            >
              {isCompared
                ? "Remove from Compare"
                : "Add to Compare"}
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>

        <PolicyIllustration />
      </div>

      {/* ================= DETAILS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <CoverageDetails policy={policy} />
          <BenefitsList benefits={policy.benefits || []} />
          <ExclusionsList exclusions={policy.exclusions || []} />
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 h-fit">
          <PolicyScore score={policy.score} />
          <ProviderRating
           claimSettlement={policy.claimSettlement}
           customerService={policy.customerService}
           tatDays={policy.tat}
          />


        </div>
      </div>
    </div>
  );
}

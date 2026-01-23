import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";
import api from "../api";

export default function QuoteSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  // ---------------- HOOKS ----------------
  const [tenure, setTenure] = useState(1);

  const policy = location.state?.policy;
  const from = location.state?.from || -1;


  // ---------------- SAFE REDIRECT ----------------
  useEffect(() => {
    if (!policy) {
      navigate("/catalog", { replace: true });
    }
  }, [policy, navigate]);

  if (!policy) return null;

  // =================================================
  // 🔥 NORMALIZE PREMIUM (ALWAYS TO ANNUAL FIRST)
  // =================================================
  const getAnnualBasePremium = (policy) => {
  // ================= HEALTH =================
  if (policy.monthly_premium)
    return policy.monthly_premium * 12;

  // ================= LIFE =================
  if (policy.min_monthly_premium)
    return policy.min_monthly_premium * 12;

  // ================= TRAVEL (🔥 FIX) =================
  if (policy.min_premium && policy.max_premium) {
    // choose mid-point or min based on preference
    return (policy.min_premium + policy.max_premium) / 2;
    // OR if you prefer lowest price:
    // return policy.min_premium;
  }

  // ================= OTHER POLICIES =================
  if (policy.min_annual_premium)
    return policy.min_annual_premium;

  if (policy.base_premium)
    return policy.base_premium;

  return 0;
};


  const annualBase = getAnnualBasePremium(policy);

  // ---------------- DISCOUNT ----------------
  const discount =
    tenure === 2 ? 0.05 :
    tenure === 3 ? 0.10 : 0;

  const discountedAnnual = annualBase - annualBase * discount;
  const annualTax = discountedAnnual * 0.18;
  const annualTotal = discountedAnnual + annualTax;

  // ---------------- MONTHLY (DISPLAY + SAVE) ----------------
  const monthlyBase = annualBase / 12;
  const monthlyTax = annualTax / 12;
  const monthlyTotal = annualTotal / 12;

  // =================================================
  // 💾 SAVE QUOTE (MONTHLY VALUES → DB)
  // =================================================
  const saveQuote = async () => {
  try {
    if (!policy.policy_type) {
      alert("Policy type missing. Cannot save quote.");
      return;
    }

    await api.post("/saved-quotes", {
      policy_type: policy.policy_type, // ✅ SINGLE SOURCE OF TRUTH
      policy_id: policy.id,
      policy_name: policy.policy_name || policy.name,
      insurer_name: policy.insurer_name || policy.insurer,
      tenure,
      base_premium: Math.round(monthlyBase),
      gst: Math.round(monthlyTax),
      total_premium: Math.round(monthlyTotal),
    });

    alert("Quote saved successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to save quote");
  }
};



  // ---------------- DOWNLOAD PDF ----------------
  const downloadPDF = () => {
  const pdf = new jsPDF();
  pdf.setFont("helvetica", "normal");

  let y = 20;

  // ================= TITLE =================
  pdf.setFontSize(18);
  pdf.text("Insurance Quote Summary", 20, y);
  y += 14;

  pdf.setFontSize(11);
  pdf.setTextColor(120);
  pdf.text("Generated quote based on your selected policy", 20, y);
  y += 12;

  pdf.setTextColor(0);

  // ================= POLICY DETAILS =================
  pdf.setFontSize(12);
  pdf.text(`Policy Name: ${policy.policy_name || policy.name}`, 20, y);
  y += 8;

  pdf.text(`Insurer: ${policy.insurer_name || policy.insurer}`, 20, y);
  y += 8;

  pdf.text(`Policy Type: ${policy.policy_type}`, 20, y);
  y += 8;

  pdf.text(`Tenure: ${tenure} Year${tenure > 1 ? "s" : ""}`, 20, y);
  y += 14;

  // ================= FINAL PREMIUM =================
  pdf.setFontSize(14);
  pdf.text("Final Premium", 20, y);
  y += 8;

  pdf.setFontSize(20);
  pdf.text(`Rs. ${Math.round(monthlyTotal)} / month`, 20, y);
  y += 14;

  // ================= BREAKDOWN =================
  pdf.setFontSize(14);
  pdf.text("Premium Breakdown", 20, y);
  y += 10;

  pdf.setFontSize(12);
  pdf.text(`Base Premium: Rs. ${Math.round(monthlyBase)}`, 20, y);
  y += 8;

  if (discount > 0) {
    pdf.text(
      `Tenure Discount (${discount * 100}%): -Rs. ${Math.round(
        monthlyBase * discount
      )}`,
      20,
      y
    );
    y += 8;
  }

  pdf.text(`GST (18%): Rs. ${Math.round(monthlyTax)}`, 20, y);
  y += 12;

  // ================= FOOTER =================
  pdf.setFontSize(10);
  pdf.setTextColor(100);
  pdf.text(
    "This quote is indicative and subject to insurer terms & conditions.",
    20,
    y
  );

  pdf.save("insurance-quote-summary.pdf");
};





  return (
    <div className="min-h-screen bg-[#f7f7fb] px-10 py-8 grid grid-cols-3 gap-8">

      {/* LEFT */}
      <div className="col-span-2 space-y-6">

        {/* BACK */}
        <button
          onClick={() => navigate(from)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">
            Your Quote Summary
          </h1>
          <p className="text-gray-500 text-sm">
            Review premium & coverage before purchase
          </p>
        </div>

        {/* TENURE */}
        <div className="bg-white p-6 rounded-2xl">
          <p className="text-sm font-medium mb-4">
            Coverage Tenure
          </p>

          <div className="flex gap-3">
            {[1, 2, 3].map((y) => (
              <button
                key={y}
                onClick={() => setTenure(y)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  tenure === y
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {y} Year{y > 1 && "s"}
                {y === 2 && " • Save 5%"}
                {y === 3 && " • Save 10%"}
              </button>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="bg-purple-50 p-6 rounded-2xl text-center">
          <p className="text-xs text-gray-500">TOTAL PREMIUM</p>
          <h2 className="text-4xl font-bold mt-2">
            ₹{Math.round(monthlyTotal)}/month
          </h2>
          <p className="text-green-600 text-sm mt-2">
            ✓ Includes all taxes & fees
          </p>
        </div>

        {/* BREAKDOWN */}
        <div className="bg-white p-6 rounded-2xl space-y-3">
          <h3 className="font-semibold">
            Detailed Breakdown (Monthly)
          </h3>

          <Row label="Base Premium" value={monthlyBase} />
          <Row label="GST (18%)" value={monthlyTax} />

          {discount > 0 && (
            <Row
              label={`Tenure Discount (${discount * 100}%)`}
              value={-(monthlyBase * discount)}
              green
            />
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="px-6 py-3 rounded-xl border  bg-purple-600 text-white"
          >
            Download PDF
          </button>

          <button
            onClick={saveQuote}
            className="px-6 py-3 rounded-xl border  bg-purple-600 text-white"
          >
            Save Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, green }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={green ? "text-green-600" : ""}>
        ₹{Math.round(value)}
      </span>
    </div>
  );
}

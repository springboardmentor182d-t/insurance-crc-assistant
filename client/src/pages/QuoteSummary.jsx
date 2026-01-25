import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";
import api from "../api";

export default function QuoteSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [tenure, setTenure] = useState(1);

  const policy = location.state?.policy;
  const from = location.state?.from || -1;

  /* ---------------- SAFE REDIRECT ---------------- */
  useEffect(() => {
    if (!policy) {
      navigate("/catalog", { replace: true });
    }
  }, [policy, navigate]);

  if (!policy) return null;

  /* =================================================
     🔥 NORMALIZE PREMIUM (ANNUAL BASE)
  ================================================= */
  const getAnnualBasePremium = (policy) => {
    if (policy.monthly_premium) return policy.monthly_premium * 12;
    if (policy.min_monthly_premium) return policy.min_monthly_premium * 12;
    if (policy.min_premium && policy.max_premium)
      return (policy.min_premium + policy.max_premium) / 2;
    if (policy.min_annual_premium) return policy.min_annual_premium;
    if (policy.base_premium) return policy.base_premium;
    return 0;
  };

  const annualBase = getAnnualBasePremium(policy);

  /* ---------------- CALCULATIONS ---------------- */
  const discount =
    tenure === 2 ? 0.05 :
    tenure === 3 ? 0.10 : 0;

  const discountedAnnual = annualBase - annualBase * discount;
  const annualTax = discountedAnnual * 0.18;
  const annualTotal = discountedAnnual + annualTax;

  const monthlyBase = annualBase / 12;
  const monthlyTax = annualTax / 12;
  const monthlyTotal = annualTotal / 12;

  /* ---------------- SAVE QUOTE ---------------- */
  const saveQuote = async () => {
    try {
      await api.post("/saved-quotes", {
        policy_type: policy.policy_type,
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

  /* ---------------- DOWNLOAD PDF ---------------- */
  const downloadPDF = () => {
    const pdf = new jsPDF();
    let y = 20;

    pdf.setFontSize(18);
    pdf.text("Insurance Quote Summary", 20, y);
    y += 12;

    pdf.setFontSize(12);
    pdf.text(`Policy: ${policy.policy_name || policy.name}`, 20, y);
    y += 8;
    pdf.text(`Insurer: ${policy.insurer_name || policy.insurer}`, 20, y);
    y += 8;
    pdf.text(`Tenure: ${tenure} year(s)`, 20, y);
    y += 12;

    pdf.setFontSize(16);
    pdf.text(`₹ ${Math.round(monthlyTotal)} / month`, 20, y);
    y += 12;

    pdf.setFontSize(12);
    pdf.text(`Base: ₹ ${Math.round(monthlyBase)}`, 20, y);
    y += 8;
    pdf.text(`GST: ₹ ${Math.round(monthlyTax)}`, 20, y);

    pdf.save("insurance-quote-summary.pdf");
  };

  return (
    <div className="min-h-screen px-6 sm:px-10 py-8 max-w-6xl mx-auto space-y-8 bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* BACK */}
      <button
        onClick={() => navigate(from)}
        className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Your Quote Summary
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Review premium & coverage before purchase
        </p>
      </div>

      {/* TENURE */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl">
        <p className="text-sm font-medium mb-4">
          Coverage Tenure
        </p>

        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3].map((y) => (
            <button
              key={y}
              onClick={() => setTenure(y)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${
                  tenure === y
                    ? "bg-[var(--accent)] text-white"
                    : "border border-[var(--border)] text-[var(--text-muted)]"
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
      <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl text-center">
        <p className="text-xs text-[var(--text-muted)]">
          TOTAL PREMIUM
        </p>
        <h2 className="text-4xl font-bold mt-2 text-[var(--accent)]">
          ₹{Math.round(monthlyTotal)}/month
        </h2>
        <p className="text-green-600 text-sm mt-2">
          ✓ Includes all taxes & fees
        </p>
      </div>

      {/* BREAKDOWN */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 rounded-2xl space-y-3">
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
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:opacity-90"
        >
          Download PDF
        </button>

        <button
          onClick={saveQuote}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:opacity-90"
        >
          Save Quote
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, green }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className={green ? "text-green-600" : ""}>
        ₹{Math.round(value)}
      </span>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Download, FileDown, ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ExportDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- FRONTEND: EXPORT DASHBOARD CHARTS ---------------- */
  const exportDashboardCharts = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    let y = 10;

    doc.setFontSize(16);
    doc.text("Admin Dashboard – Visual Report", 10, y);
    y += 10;

    const capture = async (id, title) => {
      const el = document.getElementById(id);
      if (!el) return;

      const canvas = await html2canvas(el, { scale: 2 });
      const img = canvas.toDataURL("image/png");

      if (y > 200) {
        doc.addPage();
        y = 10;
      }

      doc.setFontSize(12);
      doc.text(title, 10, y);
      y += 5;

      doc.addImage(img, "PNG", 10, y, 190, 80);
      y += 90;
    };

    await capture("claims-chart", "Claims Overview");
    await capture("fraud-chart", "Fraud Detection");
    await capture("payout-chart", "Monthly Payouts");

    doc.save("admin_dashboard_charts.pdf");
  };

  /* ---------------- BACKEND EXPORTS ---------------- */
  const exportCSV = () => {
    window.open(`${BASE_URL}/admin/export/csv`, "_blank");
  };

  const exportPDF = () => {
    window.open(`${BASE_URL}/admin/export/pdf`, "_blank");
  };

  return (
    <div className="relative" ref={ref}>
      {/* EXPORT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        title="Export dashboard data"
        className="inline-flex items-center gap-2
                   bg-gray-900 hover:bg-gray-800
                   text-white text-sm px-4 py-2
                   rounded-lg shadow-sm transition"
      >
        <Download size={16} />
        Export
        <ChevronDown size={16} />
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          className="absolute right-0 top-12 z-50
                     bg-white border rounded-xl
                     shadow-xl w-56 overflow-hidden"
        >
          {/* EXPORT DASHBOARD (PRIMARY) */}
          <button
            onClick={() => {
              exportDashboardCharts();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-sm
                       flex items-start gap-3
                       hover:bg-gray-50 transition"
          >
            <Download size={18} className="mt-0.5 text-gray-700" />
            <div className="text-left">
              <div className="font-medium text-gray-900">
                Export Dashboard
              </div>
              <div className="text-xs text-gray-500">
                Charts as PDF
              </div>
            </div>
          </button>

          <div className="border-t mx-3" />

          {/* EXPORT CSV */}
          <button
            onClick={() => {
              exportCSV();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-sm
                       flex items-center gap-3
                       hover:bg-gray-50 transition"
          >
            <FileDown size={18} className="text-gray-700" />
            <span className="font-medium text-gray-900">
              Export CSV
            </span>
          </button>

          {/* EXPORT PDF */}
          <button
            onClick={() => {
              exportPDF();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-sm
                       flex items-center gap-3
                       hover:bg-gray-50 transition"
          >
            <Download size={18} className="text-gray-700" />
            <span className="font-medium text-gray-900">
              Export Data (PDF)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

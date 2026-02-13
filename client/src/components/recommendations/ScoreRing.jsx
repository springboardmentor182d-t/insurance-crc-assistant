import { useEffect, useState } from "react";

export default function ScoreRing({ score = 0, color = "#2563eb" }) {
  const [progress, setProgress] = useState(0);

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setProgress(score);
        clearInterval(timer);
      } else {
        setProgress(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  /* ---------- SVG CALCS ---------- */
  const radius = 26;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  /* ---------- COLOR HANDLING ---------- */
  const NAMED_COLORS = {
    red: "#ef4444",
    blue: "#2563eb",
    orange: "#f97316",
    green: "#16a34a",
    purple: "#7c3aed",
    gray: "#9ca3af",
  };

  // ✅ If hex provided, use directly. Otherwise map name.
  const ringColor =
    color.startsWith("#") ? color : NAMED_COLORS[color] || NAMED_COLORS.blue;

  return (
    <svg width="64" height="64">
      {/* Background ring */}
      <circle
        cx="32"
        cy="32"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />

      {/* Progress ring */}
      <circle
        cx="32"
        cy="32"
        r={radius}
        stroke={ringColor}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 32 32)"
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />

      {/* Score text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm font-semibold fill-slate-700"
      >
        {progress}%
      </text>
    </svg>
  );
}

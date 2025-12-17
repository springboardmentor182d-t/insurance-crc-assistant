// src/components/common/SignupIllustration.jsx
import React from "react";

/**
 * Signup-specific illustration SVG (yellow panel style).
 * Usage: <SignupIllustration width={380} height={380} />
 */
export default function SignupIllustration({ width = 380, height = 380 }) {
  const vw = 420, vh = 420; // viewBox dims tuned for the yellow right panel
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vw} ${vh}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
    >
      <defs>
        <radialGradient id="gA" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#FFF7DF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFF0B8" stopOpacity="1" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="30" floodColor="#dfeaf8" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Yellow rounded rectangle background (the panel background itself will still be present outside, this adds inner glow) */}
      <rect width={vw} height={vh} rx="26" fill="url(#gA)" />

      {/* Pale circle behind the device */}
      <circle cx={vw / 2} cy={vh / 2 - 8} r="110" fill="#FFF3D2" opacity="0.92" />

      {/* Central device (white card) */}
      <g transform={`translate(${(vw - 160) / 2},${(vh - 220) / 2})`}>
        <rect x="0" y="0" rx="18" width="160" height="220" fill="#fff" stroke="#E6EDF7" strokeWidth="6" />
        {/* interior lines (text placeholders) */}
        <g transform="translate(20,26)" fill="#E6EEF8">
          <rect x="0" y="8" rx="8" width="120" height="10" />
          <rect x="0" y="34" rx="8" width="100" height="10" />
          <rect x="0" y="60" rx="8" width="100" height="10" />
        </g>
        {/* small circular avatar at bottom of device */}
        <circle cx="80" cy="170" r="14" fill="#60A5FA" />
        {/* device shadow */}
        <ellipse cx="80" cy="232" rx="48" ry="6" fill="#F3E9CF" opacity="0.6" />
      </g>

      {/* left small person */}
      <g transform={`translate(${vw * 0.18},${vh * 0.35})`}>
        <circle cx="0" cy="0" r="14" fill="#60A5FA" />
        <rect x="-12" y="16" width="24" height="12" rx="6" fill="#60A5FA" opacity="0.95" />
      </g>

      {/* top-right small person */}
      <g transform={`translate(${vw * 0.80},${vh * 0.25})`}>
        <circle cx="0" cy="0" r="12" fill="#F59E0B" />
        <rect x="-10" y="14" width="20" height="10" rx="6" fill="#F59E0B" opacity="0.95" />
      </g>

      {/* bottom-left small person */}
      <g transform={`translate(${vw * 0.22},${vh * 0.65})`}>
        <circle cx="0" cy="0" r="10" fill="#10B981" />
        <rect x="-8" y="12" width="16" height="8" rx="5" fill="#10B981" opacity="0.95" />
      </g>

      {/* green check bubble */}
      <g transform={`translate(${vw * 0.73},${vh * 0.55})`}>
        <circle cx="0" cy="0" r="14" fill="#10B981" />
        <path d="M-5 0 l3 4 l6 -7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* tiny decorative dots */}
      <circle cx={vw * 0.4} cy={vh * 0.2} r="4" fill="#FCD34D" />
      <circle cx={vw * 0.62} cy={vh * 0.78} r="3.5" fill="#60A5FA" />
      <circle cx={vw * 0.54} cy={vh * 0.18} r="3" fill="#F59E0B" />

      {/* soft outer shadow stroke to imitate inset */}
      <rect x="6" y="6" width={vw - 12} height={vh - 12} rx="20" fill="none" filter="url(#shadow)" />
    </svg>
  );
}

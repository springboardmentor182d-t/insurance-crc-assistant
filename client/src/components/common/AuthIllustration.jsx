// src/components/common/AuthIllustration.jsx
import React from "react";

/**
 * Reusable auth illustration for Login / Signup.
 * Props: width, height
 */
export default function AuthIllustration({ width = 320, height = 300 }) {
  const vw = 320, vh = 300;
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
        <radialGradient id="bgG" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#F3F8FF" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </radialGradient>
        <filter id="softShadowAuth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#dfefff" floodOpacity="0.7"/>
        </filter>
      </defs>

      <rect width={vw} height={vh} rx="14" fill="#F7FBFF" />

      {/* large pale circle behind */}
      <g transform="translate(10,8)">
        <circle cx="140" cy="110" r="85" fill="#EAF2FF" opacity="0.95" />
      </g>

      {/* laptop */}
      <g transform="translate(20,60)">
        <rect x="28" y="36" rx="8" ry="8" width="220" height="96" fill="#ffffff" stroke="#E6EDF7" strokeWidth="6"/>
        <rect x="56" y="58" rx="6" ry="6" width="160" height="66" fill="#fff"/>
        <g transform="translate(156,96)">
          <rect x="-12" y="-12" rx="4" ry="4" width="24" height="20" fill="#2563EB" />
          <rect x="-8" y="-8" rx="2" ry="2" width="16" height="10" fill="#fff" />
          <path d="M-4 -2 v -4 a4 4 0 0 1 8 0 v4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
        <rect x="20" y="136" width="236" height="8" rx="4" fill="#BFD7F7" opacity="0.8" />
      </g>

      {/* person */}
      <g transform="translate(160,18)">
        <circle cx="0" cy="0" r="16" fill="#F59E0B" />
        <rect x="-14" y="16" width="28" height="26" rx="8" fill="#F59E0B" />
      </g>

      {/* green check */}
      <g transform="translate(270,110)">
        <circle cx="0" cy="0" r="12" fill="#10B981" />
        <path d="M-5 0 l3 3 l6 -6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>

      {/* floating dots */}
      <circle cx="42" cy="76" r="6" fill="#F59E0B" />
      <circle cx="280" cy="44" r="4" fill="#60A5FA" />
      <circle cx="250" cy="228" r="3.2" fill="#FCD34D" />

      {/* soft outer glow */}
      <rect x="6" y="6" width={vw - 12} height={vh - 12} rx="12" fill="none" filter="url(#softShadowAuth)" />
    </svg>
  );
}

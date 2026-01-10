/* ===============================
   HELPERS
================================ */

// Safely convert anything to a number
const toNumber = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;

  const n = Number(value);
  return isNaN(n) ? null : n;
};

// SAFE number extractor (NO CRASHES)
const extractNumber = (value) => {
  if (value === null || value === undefined) return null;

  // already a number
  if (typeof value === "number") return value;

  // only strings can use match
  if (typeof value === "string") {
    const match = value.match(/(\d+(\.\d+)?)/);
    return match ? Number(match[1]) : null;
  }

  // objects / arrays / others
  return null;
};

// Extract "After X Years"
const extractYears = (value) => {
  if (typeof value !== "string") return null;

  const match = value.match(/(\d+)\s*year/i);
  return match ? `After ${match[1]} Years` : null;
};

// Normalize category
const normalizeCategory = (category) => {
  if (!category) return "Unknown";

  return category
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

/* ===============================
   POLICY NORMALIZER (FINAL)
================================ */
export function normalizePolicy(input) {
  if (!input) return null;

  // Recommendation view passes { policy: {...} }
  const policy = input.policy ?? input;

  const benefits = Array.isArray(policy.benefits)
    ? policy.benefits
    : [];

  /* ---------- DERIVED VALUES ---------- */
  const cashlessHospitals = benefits
    .map((b) => extractNumber(b))
    .find(Boolean);

  const preExistingCoverage = benefits
    .map((b) => extractYears(b))
    .find(Boolean);

  return {
    /* ---------- BASIC ---------- */
    id: policy.id,
    title: policy.name || policy.title || "Unknown Policy",
    provider:
      policy.provider?.name ||
      policy.provider ||
      "Unknown Provider",
    category: normalizeCategory(policy.category),

    /* ---------- NUMBERS ---------- */
    premium: toNumber(policy.premium),

    // 🔑 THIS MATCHES YOUR COMPARE PAGE
    coverage: toNumber(
      policy.coverage?.sum_insured ??
      policy.coverage?.amount ??
      policy.coverage
    ),

    deductible: toNumber(policy.deductible),

    waitingPeriod:
      extractNumber(policy.waitingPeriod) ??
      extractNumber(policy.waiting_period) ??
      null,

    /* ---------- METRICS ---------- */
    cashlessHospitals,
    claimSettlement: policy.claimSettlement ?? null,
    preExistingCoverage,

    /* ---------- ROOM ---------- */
    roomRent: policy.roomRent ?? null,

    /* ---------- BOOLEANS ---------- */
    dayCare: benefits.some(
      (b) =>
        typeof b === "string" &&
        /day[-\s]?care/i.test(b)
    ),

    ambulance: benefits.some(
      (b) =>
        typeof b === "string" &&
        /ambulance/i.test(b)
    ),

    healthCheckup: benefits.some(
      (b) =>
        typeof b === "string" &&
        /health\s*check|check[-\s]?up/i.test(b)
    ),

    /* ---------- RAW ---------- */
    benefits,
  };
}

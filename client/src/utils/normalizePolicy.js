import { comparisonRules } from "../config/comparisonRules";

/* ===============================
   CATEGORY NORMALIZER
================================ */
const normalizeCategory = (category) => {
  if (!category) return "Unknown";

  return category
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

/* ===============================
   POLICY NORMALIZER
================================ */
export function normalizePolicy(policy) {
  // ✅ Keep UI-required fields
  const normalized = {
    id: policy.id,
    name: policy.name,
    provider: policy.provider,
    category: normalizeCategory(policy.category), // ✅ FIX
  };

  // ✅ Dynamic comparison values
  comparisonRules.forEach((rule) => {
    let value;

    if (rule.extract) {
      value = rule.extract(policy[rule.source]);
    } else if (rule.getValue) {
      value = rule.getValue(policy);
    } else {
      value = policy[rule.key];
    }

    if (rule.type === "number" && value != null) {
      value = Number(value);
    }

    if (rule.type === "rank") {
      value = rule.ranking?.[value] ?? null;
    }

    normalized[rule.key] = value ?? null;
  });

  return normalized;
}

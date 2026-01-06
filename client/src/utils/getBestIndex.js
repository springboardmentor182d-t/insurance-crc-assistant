export function getBestIndex(rule, values) {
  const valid = values.map(v => v ?? null);

  if (rule.type === "boolean") {
    const hasTrue = valid.some(v => v === true);
    const hasFalse = valid.some(v => v === false);
    return hasTrue && hasFalse ? valid.indexOf(true) : null;
  }

  if (rule.type === "number" || rule.type === "rank") {
    const nums = valid.filter(v => typeof v === "number");
    if (nums.length < 2) return null;

    const best =
      rule.better === "lower"
        ? Math.min(...nums)
        : Math.max(...nums);

    return valid.indexOf(best);
  }

  return null;
}

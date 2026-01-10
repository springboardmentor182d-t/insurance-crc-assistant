export const getBestIndex = (rule, values) => {
  const numericValues = values.map((v) =>
    typeof v === "number" ? v : null
  );

  if (numericValues.every((v) => v == null)) return null;

  if (rule.better === "lower") {
    const min = Math.min(...numericValues.filter(Boolean));
    return numericValues.indexOf(min);
  }

  if (rule.better === "higher") {
    const max = Math.max(...numericValues.filter(Boolean));
    return numericValues.indexOf(max);
  }

  return null;
};

export const comparisonRules = [
  {
    key: "premium",
    label: "Annual Premium",
    type: "number",
    better: "lower",
    source: "premium",
    format: (v) => `₹ ${v.toLocaleString("en-IN")}`,
  },
  {
    key: "coverage",
    label: "Sum Insured",
    type: "number",
    better: "higher",
    source: "coverage",
    format: (v) => `₹ ${v.toLocaleString("en-IN")}`,
  },
  {
    key: "hospitals",
    label: "Cashless Hospitals",
    type: "number",
    better: "higher",
    source: "benefits",
    extract: (benefits) => {
      const match = benefits?.find(b => /hospital/i.test(b));
      return match ? Number(match.match(/\d+/)?.[0]) : null;
    },
    format: (v) => (v ? `${v}+` : "N/A"),
  },
  {
    key: "waitingPeriod",
    label: "Waiting Period",
    type: "number",
    better: "lower",
    source: "waitingPeriod",
    extract: (v) => (v === "None" ? 0 : Number(v.match(/\d+/)?.[0])),
    format: (v) => (v === 0 ? "None" : `${v} Days`),
  },
  {
    key: "preExisting",
    label: "Pre-existing Coverage",
    type: "number",
    better: "lower",
    source: "benefits",
    extract: (benefits) =>
      benefits?.some(b => /pre-existing/i.test(b)) ? 3 : null,
    format: (v) => (v ? `After ${v} Years` : "N/A"),
  },
  {
    key: "roomRent",
    label: "Room Rent Limit",
    type: "rank",
    better: "higher",
    source: "roomRent",
    ranking: {
      "No Limit": 3,
      "Single Private Room": 2,
      "Shared Room": 1,
    },
  },
  {
    key: "dayCare",
    label: "Day Care Procedures",
    type: "boolean",
    source: "benefits",
    extract: (benefits) =>
      benefits?.some(b => /day.?care/i.test(b)),
  },
  {
    key: "ambulance",
    label: "Ambulance Cover",
    type: "boolean",
    source: "benefits",
    extract: (benefits) =>
      benefits?.some(b => /ambulance/i.test(b)),
  },
  {
    key: "healthCheckup",
    label: "Health Check-up",
    type: "boolean",
    source: "benefits",
    extract: (benefits) =>
      benefits?.some(b => /health check/i.test(b)),
  },
];
